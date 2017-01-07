import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {DropEvent} from "./models/drop-event.model";

@Directive({
    selector: '[drop]',
    host: {
        '[draggable]': 'true'
    }
})
export class Drop {

    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    
    /**
     * Event fired when an element is being dragged over a valid drop target  
     */
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    @Output() onDrop: EventEmitter<DropEvent> = new EventEmitter<DropEvent>();

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string = 'default';

    constructor(protected el: ElementRef) {
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e:any) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e:any) {
        if (this.allowDrop(e)) {
            e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e:any) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e:any) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        let data:any;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));
            console.log(data);
        } catch (e) {
            data = e;
        }
        this.onDrop.emit(new DropEvent(e, data));
    }

    allowDrop(e:any): boolean {
        let allow = false;
        let types = e.dataTransfer.types;
        if (types && types.length) {
            for (let i = 0; i < types.length; i++) {
                if (types[i] == this.dropScope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    }
}