import * as firebase from 'firebase';
import { toast } from './toast';

const config = {
    apiKey: "AIzaSyACkY0vxgXNL-zFn7tdj_43SOBe8xo1ego",
    authDomain: "ionic-react-61cb8.firebaseapp.com",
    databaseURL: "https://ionic-react-61cb8.firebaseio.com",
    projectId: "ionic-react-61cb8",
    storageBucket: "ionic-react-61cb8.appspot.com",
    messagingSenderId: "1038283340745",
    appId: "1:1038283340745:web:e5aa868158042b78e28618",
    measurementId: "G-E8S8L7GV3M"

}

firebase.initializeApp(config)

export async function loginUser(username: string, password: string){

    const email = `${username}@gnopor.cm`

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return res
    } catch (error) {
        toast(error.message, 4000)
        return false
    }

}

export function logoutUser(){
    return firebase.auth().signOut()
}

export async function registerUser(username: string, password: string){
    const email = `${username}@gnopor.cm`

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email,password)
        console.log(res)
        return true
    } catch (error) {
        toast(error.message, 4000)
        return false
        
    }
}


export function getCurrentUser(){
    return new Promise((resolve, reject) =>{
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                resolve(user.email)
            }else{
                resolve(null)
            }
            unsubscribe()
        })
    })
}