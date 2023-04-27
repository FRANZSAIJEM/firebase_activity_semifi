<template>
    <div class="body">
        <div class="d-block container mt-3" style="position: fixed;">

            <div class="total p-5" style="margin: 50px; margin-bottom: 100px; background-color: white; border-radius: 20px; width: 500px;">   
                
                <h1 class="text-center"><i class="fa-solid fa-users"></i> {{ midterms.length }}<br> All Users</h1>
            </div>


            <div class="total p-5" style="margin: 50px; margin-bottom: 100px; background-color: white; border-radius: 20px; width: 500px;">
                 <h1 class="text-center" style="color:pink"><i class="fa-solid fa-person-dress"></i> {{ femaleUsers }}<br> Female Users</h1>     
            </div>


            
            <div class="total p-5" style="margin: 50px; margin-bottom: 100px; background-color: white; border-radius: 20px; width: 500px;">
                <h1 class="text-center" style="color:blue"><i class="fa-solid fa-person"></i> {{ maleUsers }}<br> Male Users</h1>
            </div>

        </div>
    <div class="body mt-5" style="margin-left: 500px;">
        <div class="container">
            <div class="d-flex flex-wrap">
                <div class="m-3" v-for="midterm in midterms" :key="midterm.midterms" style="z-index: -1;">
                    <!-- <div style="width: 500px; margin-left: 15px;" class="total card text-white" :style="{ backgroundColor: midterm.gender === 'Female' ? 'rgba(255, 100, 203, 1)' : 'rgba(100, 0, 255, 1)'}"> -->
                    <div style="width: 500px; margin-left: 15px; background-size: 40%; background-repeat: no-repeat; background-position: 275px 50px;" class="total card text-white" 
                    :style="{ backgroundImage: midterm.gender === 'Female' ? 'url(public/girl.png)' : 'url(public/boy.png)'} , { backgroundColor: midterm.gender === 'Female' ?  'pink' : 'blue'}">
                    
                        <div class="card-body">
                            <b>Full Name</b> <td>{{ midterm.fullName }}</td> <br>
                            <b>Address</b> <td>{{ midterm.address }}</td> <br>
                            <b>Contact Number</b> <td>{{ midterm.contactNumber }}</td> <br>
                            <b>Email Address</b> <td>{{ midterm.emailAddress }}</td>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    </div>
  
    </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue'
    import {db} from '../firebase/index.js'
    import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
    import { auth } from '../firebase/index.js'
    import { createUserWithEmailAndPassword } from 'firebase/auth'
    import { RouterLink } from 'vue-router'
    import router from '../router'
    
    
    
    const midterms = ref([])
    const id = ref(1)
    const q = (collection(db, "midterm"));
    

    const femaleUsers = ref(0)
    const maleUsers = ref(0)


    onMounted(async()=>{
      onSnapshot(q,(snapshot)=> {
        const midtermTmp = []
        let femaleCount = 0
        let maleCount = 0


        snapshot.forEach((doc) => {
    
        const midterm = {
          id: doc.id,
          fullName: doc.data().fullName,
          address: doc.data().address,
          gender: doc.data().gender,
          emailAddress: doc.data().emailAddress,
          contactNumber: doc.data().contactNumber,
          completed: doc.data().completed
        }
    
        midtermTmp.push(midterm)

        if(midterm.gender == 'Female'){
            femaleCount++
        }

        if(midterm.gender == 'Male'){
            maleCount++
        }
      });
      midterms.value = midtermTmp
      femaleUsers.value = femaleCount
      maleUsers.value = maleCount

      })
    })

    </script>

    <style>
    .body{
        display: grid;
        place-content: center;
    }
    .total{
        box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px;
    }
  
   
    </style>