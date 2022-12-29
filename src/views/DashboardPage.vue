<template>
    <v-container fill-height>
        <v-row no-gutters>
            <v-col md="12" offset-md="4" justify="center" align="center">
                

                    <!-- this line start -->
                    <v-card :loading="loading" class="mx-auto my-12" max-width="374" v-for="user in this.users" :key="user.id">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>

                        

                        <v-card-title>{{ user.controlno }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">
                               
                            </v-row>

                           

                            <div>{{ user.password }}</div>
                            <div>{{ user.datecreated }}</div>
                        </v-card-text>

                       

                        

                        <v-card-actions>
                            <v-btn color="deep-purple lighten-2" text @click="$router.push({ name: 'EdituserPage', params:{id:user.ID}})">
                                Edit
                            </v-btn>
                            <v-btn color="deep-purple lighten-2" text @click="deleteuser(user.controlno)">
                                Delete
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <!-- this line ends -->

                    <v-btn color="deep-purple lighten-2" text @click="NewUser">
                                Add
                            </v-btn>
            </v-col>
        </v-row>
         <!-- start dialog -->
         <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Error Deleting
            </v-card-title>

            <v-card-text>
              Please contact your system administrator!
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>

              <v-btn color="green darken-1" text @click="dialog = false">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end dialog -->
    </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {
    data: () => ({
        loading: false,
        selection: 1,
        dialog:false
       
    }),
    computed:{
        ...mapGetters('users',{users: 'getUsers'})
    },
    methods: {
        ...mapActions('users',['fetchUsers','Deleteuser']),
        NewUser() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
            this.$router.push('/NewUserPage')
        },
       
        deleteuser(controlno){
            let data= new FormData;
            data.append('controlno',controlno);
            this.Deleteuser(data).then(e=>{
                if(e == 0)
                    this.dialog=true;
                    else
                    this.fetchUsers();
            });
        }
    },
    created(){
        this.fetchUsers();

    //     setTimeout(() => {
    //   console.log("after 1 sec=>",this.users);
   
    

    // }, 1000);
    }
}
</script>