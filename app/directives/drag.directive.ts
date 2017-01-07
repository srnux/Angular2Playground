import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[drag]',
    host: {
        '[draggable]': 'true'
    }
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Drag {
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event. 
     */
    @Input() dragData:any;

    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element. 
     */
    @Input() dragHandle: string;

    /**
     * Currently not used
     */
    @Input() dragEffect = 'move';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dragScope: string = 'default';

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Event fired when Drag is started
     */
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     */
    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when dragged ends
     */
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    private mouseOverElement: any;


    @HostListener('dragstart', ['$event'])
    dragStart(e:any) {
        if (this.allowDrag()) {
            e.target.classList.add(this.dragOverClass);
            e.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
            e.dataTransfer.setData(this.dragScope, this.dragScope);
            e.stopPropagation();
            this.onDragStart.emit(e);
        }
        else {
            e.preventDefault();
        }
    }

    @HostListener('drag', ['$event'])
    drag(e:any) {
        console.log("drag");
        this.onDrag.emit(e)
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e:any) {
        e.target.classList.remove(this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mouseover', ['$event'])
    mouseover(e:any) {
        this.mouseOverElement = e.target;
    }

    private allowDrag() {
        if (this.dragHandle)
            return this.mouseOverElement.matches(this.dragHandle);
        else
            return true;
    }
}