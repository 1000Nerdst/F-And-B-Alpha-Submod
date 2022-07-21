<template>
    <v-app>
        <!-- make a box in the middle of the screen -->
        <v-card>
            <v-row>
                <!-- toggle buttons with the login in or register buttons
                exclusives toggle -->
                <v-card-actions>
                    <v-btn-toggle
                    mandatory
                    rounded>
                        <v-btn
                        :disabled="step === 1"
                        text
                        @click="step--"
                        >Login</v-btn>
                        <v-btn
                        :disabled="step === 2"
                        text
                        @click="step++"
                        >Register</v-btn>    
                    </v-btn-toggle>
                </v-card-actions>
            </v-row>
            <v-row>
                <v-window
                v-model="step">
                    <!-- make the login in options  -->
                    <!-- make sure the to put the staff options in the bottom corner -->
                    <v-window-item
                    :value="1">
                        <v-card-text>
                            <v-text-field
                            label="Email"
                            ></v-text-field>
                            <v-text-field
                            label="Password"
                            type="password"
                            ></v-text-field>
                            <v-btn>Login</v-btn>
                        </v-card-text>
                    </v-window-item>
                    <!-- make the register options -->
                    <v-window-item
                    :value="2">
                        <v-card-text>
                            <v-text-field
                            label="Email"
                            name="regEmail"
                            id="regEmail"
                            v-model="regEmail"
                            typeof="email"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Username"
                            name="username"
                            id="username"
                            v-model="username"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Patreon Username"
                            name="Patreon Username"
                            id="patreonUsername"
                            v-model="patreonUsername"
                            typeof="email"
                            ></v-text-field>
                            <v-text-field
                            label="Password"
                            type="password"
                            name="password"
                            id="password"
                            v-model="regPassword"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            v-model="confirmPassword"
                            :rules="[comparePasswords]"
                            ></v-text-field>
                            <!-- <v-checkbox
                            v-model="checkbox"
                            required
                            >I Agree to terms and conditions</v-checkbox> -->
                            <v-btn
                            @click="newUser()">Register</v-btn>
                        </v-card-text>
                    </v-window-item>
                </v-window>
            </v-row>
        </v-card>
    </v-app>
</template>

<script>
//import * as firebase from "firebase/app"
import { createUserWithEmailAndPassword} from "firebase/auth"
//import db from '@/fb'
import auth from '../fb'
import { collection, doc, setDoc} from 'firebase/firestore'
//import createUser from '../fb'
//import db from '../fb'
import fsdb from '../fb'

export default {

    data: () => ({
        current: "login",
        regEmail: "",
        username: "",
        regPassword:"",
        patreonUsername:"",
        confirmPassword:"",

        step: 1,

    }),
    computed:{
        comparePasswords(){
            console.log("comparing passwords")
            console.log(this.regPassword)
            console.log("to")
            console.log(this.confirmPassword)
            return this.regPassword !== this.confirmPassword ? 'Password do not match' : ''
        }
    },
    methods:{
        newUser(){
            console.log({email: this.regEmail, password: this.regPassword, confirmPassword: this.confirmPassword, username: this.username, patreonUsername: this.patreonUsername})
            
            try{
                const user = createUserWithEmailAndPassword(auth, this.regEmail, this.regPassword)
                console.log(user)
            }catch(err){
                console.log(err)
            }
            const cUser = auth.currentUser            
            const userInfo = {
                userEmail: this.regEmail,
                username: this.username,
                patreonUsername: this.patreonUsername,
                staff: false,
                investor: false,
                uid: cUser
            }

            const newUserRef = doc(collection(fsdb, 'userInfo'))

            const docRef = setDoc(newUserRef, userInfo);
            console.log(docRef)
            //createUser(userInfo)
            // db.collection('userInfo').doc(cUser).add(userInfo).then(() => console.log('added to database'))
        },
        onSignup (){
            console.log({email: this.email, password: this.password, confirmPassword: this, username: this.username, patreonUsername: this.patreonUsername})
        },
        loginTrig() {
            this.current = "login"
        },
        regTrig(){
            this.current = "register"
        }
    }

}
</script>

<style>

</style>