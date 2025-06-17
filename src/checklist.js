class checklistItem{
    constructor(title){
        this.title = title;
        this.status = 'Not Completed';
    }
}

export function createCheckListItem(title){
    return new checklistItem(title);
}