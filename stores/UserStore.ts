import {observable, action, autorun} from "mobx";
import * as Storage from '../utils/AsyncStorage';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Config} from "../constants/Config";
const storageKey = 'auth';
const phone_prefix = '+86';
class UserStore {
    @observable username = '';
    @observable userId = 0;
    @observable userType = '';
    @observable token = '';

    constructor() {
        this.load();
        autorun(this.save)
    }
    private save = () => {
        Storage.putObject(storageKey, JSON.stringify({ username: this.username, userId: this.userId, userType: this.userType, token: this.token}));
    }
    @action.bound
    public isValid = () => {
        return this.userId > 0 && !isEmpty(this.token)
    }
    @action.bound
    private load = () => {
        Storage.getObject(storageKey).then((data) => {
            Object.assign(this, JSON.parse(data))
        })
    }
    @action.bound
    public playerLogin = async (phone_number: any, password: any) => {
        try{
            const res = await axios.post(Config.api_url + 'player_login', {phone_number: phone_prefix + phone_number, password: password});
            if(!res.data.error) {
                this.username = res.data.user.username;
                this.userId = res.data.user.id;
                this.userType = res.data.role;
                this.token = res.data.access_token;
            }
            console.log("this is player login", res);
        }
        catch (e) {
            console.log(e);
        }
    }

    @action.bound
    public playerSignUp = async (phone_number: string, password: any) => {
        try{
            const res = await axios.post(Config.api_url + 'player_register', {phone_number: phone_prefix + phone_number, password: password});
            if(!res.data.error) {
                this.username = res.data.user.username;
                this.userId = res.data.user.id;
                this.userType = res.data.role;
                this.token = res.data.access_token;
            }
            console.log("this is player signup");
        }
        catch (e) {
            console.log(e);
        }
    }

    @action.bound
    public agentLogin = async (username: any, password: any) => {
        try{
            const res = await axios.post(Config.api_url + 'player_register', {username: username, password: password});
            if(!res.data.error) {
                this.username = res.data.user.username;
                this.userId = res.data.user.id;
                this.userType = res.data.role;
                this.token = res.data.access_token;
            }
            console.log("this is agent login", res);
        }
        catch (e) {
            console.log(e);
        }
    }
    @action.bound
    public logOut = async () => {
        try {
            const AuthStr = 'Bearer ' + this.token;
            const res = await axios.get(Config.api_url + 'player_logout', { headers: { Authorization: AuthStr}});
            if(!res.data.error) {
                this.username = '';
                this.userId = 0;
                this.userType ='';
                this.token = '';
            }
        }
        catch (e) {
            throw e;
        }
    }
}

export default UserStore;
