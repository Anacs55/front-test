import { Id } from "src/VOs/Id";
import { AuditoryDTO, AuditoryField } from "../auditory";
import { ItemDTO } from "../tasks/item";
import { User } from "../user";

export type ItemActivityDTO = ItemActivity | ItemMessage;
export type ItemActivity = ItemActivitymovedColumn | ItemActivityAddedUser | ItemActivityCreatedTask | ItemActivityRemovedUser | ItemActivityUpdatedTitle | ItemActivityUpdatedDescription;

export type ItemType = 'message' | 'createdItem' | 'addedUser' | 'removedUser' | 'movedItem' | 'updatedDescription' | 'updatedTitle' | 'createdSubItem' | 'editedSubItem' | 'deletedSubItem';
export interface BaseItemActivity extends AuditoryField {
    id: string
    itemId: string
    type: ItemType
    data: any
    notReadedBy: string[]
}

export interface ItemMessage extends BaseItemActivity {
    type: 'message'
    data: {
        text: string
    }
}
export interface ItemActivityCreatedTask extends BaseItemActivity {
    type: 'createdItem'
    data: {
        columnName: string
    }
}
export interface ItemActivityAddedUser extends BaseItemActivity {
    type: 'addedUser'
    data: {
        addedUser: string
    }
}
export interface ItemActivityRemovedUser extends BaseItemActivity {
    type: 'removedUser'
    data: {
        removedUser: string
    }
}
export interface ItemActivitymovedColumn extends BaseItemActivity {
    type: 'movedItem'
    data: {
        previousColumn: string,
        newColumn: string,
    }
}
export interface ItemActivityUpdatedTitle extends BaseItemActivity {
    type: 'updatedTitle'
    data: {
        previousTitle: string,
        newTitle: string,
    }
}
export interface ItemActivityUpdatedDescription extends BaseItemActivity {
    type: 'updatedDescription'
    data: {
        previousDescription: string,
        newDescription: string,
    }
}

export function generateItemActivity(user: User, item: ItemDTO, type: ItemType, notReadedBy?: string[], data?: any): ItemActivity {
    return <ItemActivity>{
        id: Id.generate().value,
        itemId: item.id,
        type: type,
        data,
        auditory: generateAuditory(user),
        notReadedBy,
    }
}

export function generateAuditory(user: User): AuditoryDTO {
    return {
        createdAt: new Date().getTime(),
        createdBy: user.id,
    }
}