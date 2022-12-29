<template>
    <v-container fill-height>
        <v-row no-gutters>
            <v-col md="12" offset-md="4" justify="center" align="center">


                <!-- this line start -->
                <v-card :loading="loading" class="mx-auto my-12" max-width="374" elevation="24" outlined shaped>
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>



                    <v-card-title>Add New User</v-card-title>

                    <v-card-text>




                        <div>
                            <v-text-field label="Control Number"  hide-details="auto" v-model="controlno"></v-text-field>
                            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                        </div>
                    </v-card-text>



                    <v-card-actions>
                        <v-btn color="deep-purple lighten-2" text @click="register">
                            Save
                        </v-btn>
                        <v-btn color="deep-purple lighten-2" text @click="$router.push('/Dashboard')">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <!-- this line ends -->


            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';
export default {
    data: () => ({
        loading: false,
        selection: 1,
        controlno:'',
        password:'',    
        user:{
            ID:'',
            controlno:'',
            password:''
        }
    }),

    methods: {
        ...mapActions('users',['Updateuser']),
        register() {
            this.loading = true
            console.log("this.user.id",this.user.ID);
            console.log("this.controlno",this.controlno);
            console.log("this.password",this.password);
            let data=new FormData;
            data.append('id',this.user.ID);
            data.append('controlno',this.controlno);
            data.append('password',this.password);
            this.Updateuser(data);
            setTimeout(() => {
                this.loading = false;
                this.$router.push('/Dashboard');
            }, 2000)
        },
    },
    computed:{
        ...mapGetters('users',{users: 'getUsers'})
    },
    created(){
        
        this.user=this.users.find(user=>user.ID == this.$route.params.id);
        console.log("id=>",this.user.ID);
        this.controlno=this.user.controlno;
        this.password=this.user.password;
    }
}
</script>