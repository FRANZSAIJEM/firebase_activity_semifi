<template>
<nav class="total navbar navbar-expand-lg navbar-light bg-light" style="position: fixed; width: 1920px;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Midterm</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="text-center" id="navbarNavDropdown">



      <nav class="p-2" v-show="!ifSingedIn">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">Register</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link active">Login</RouterLink>
          </li>
        </ul>
      </nav>


        
      <nav v-for="midterm in midterms" :key="midterm.midterms" v-show="ifSingedIn" class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/home" class="nav-link active">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard" class="nav-link active">Dashboard</RouterLink>
          </li>

          <li class="nav-item dropdown">
                <button  class="btn btn-link nav-link text-white" type="button" id="logoutDropdown" data-toggle="dropdown"
                :style="{backgroundColor:midterm.gender === 'Female' ? 'pink' : 'blue'}"
                style="width: 275px; padding-top: 26px; margin-bottom: -70px; margin-top: -20px; margin-right: -30px;"
                >
                <p>{{ midterm.fullName }}  &nbsp;  <i class="fa-solid fa-sort-down"></i> </p> 
                </button>
                <div class="dropdown-menu total mt-3 bg-danger" style="margin-left: 115px;">
                  <RouterLink to="/login" class="nav-link active text-center text-white" @click="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</RouterLink>
                </div>
            </li>
          </ul>
      </nav>
    </div>
  </div>
</nav>


  <div class="">
    <div class="">
      <header class="p-4">

     
     
</header>
    </div>
  </div>

  <div class="" style="margin-left: 100px;">
  <RouterView />


  </div>
</template>

<style>


</style>

<script setup>
import {db} from './firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/index.js'
import router from './router'

const ifSingedIn = ref (false)


onMounted(()=>{
  onAuthStateChanged(auth, function(user){
    if(user){
      if(user.emailVerified){
        ifSingedIn.value = true
        router.push('/dashboard')
      }
      
    }else{
      router.push('/login')
    }
  })
})



const logout = () =>{
  signOut(auth)
  .then(()=>{
    ifSingedIn.value = false
    
  })
  window.location.reload();
}



const midterms = ref([])
    const id = ref(1)
    const q = (collection(db, "midterm"));
    
    onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, "midterm"), orderBy("fullName"));
      onSnapshot(q, (snapshot) => {
        const midtermTmp = [];
        snapshot.forEach((doc) => {
          const midterm = {
            id: doc.id,
            fullName: doc.data().fullName,
            address: doc.data().address,
            gender: doc.data().gender,
            emailAddress: doc.data().emailAddress,
            contactNumber: doc.data().contactNumber,
            completed: doc.data().completed,
          };
          if (midterm.emailAddress === user.email) {
            midtermTmp.push(midterm);
          }
        });
        midterms.value = midtermTmp;
      });
    }
  });
});

</script>
