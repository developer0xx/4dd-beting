import { observable, action } from 'mobx';

class HudStore {
    @observable isVisible : boolean = false;
    @observable message : string | undefined;

    @action.bound
    show(message : string){
        this.isVisible = true;
        this.message = message;
    }

    @action.bound
    hide(){
        this.isVisible = false;
        this.message = undefined;
    }
}

export default HudStore;
