<template>
  <div>
    <v-app id="inspire" class="background">
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="5" class="mx-auto">
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-container>
              <v-layout row wrap>
                <v-card class="wrapper">
                  <div class="text-center">
                    <h2>PUBLIC EDUCATION AND EMPLOYMENT SERVICES OFFICE</h2>
                  </div>
                  <v-row class="text-form">
                    <v-col offset="1" md="10">
                      <v-text-field v-model="userName" class="custom-label-color" label="User Name" color="green"
                        type="sample" prepend-inner-icon="mdi mdi-account mdi-green"></v-text-field>
                      <v-text-field v-model="password" class="custom-label-color" label="Password" type="password"
                        color="green" prepend-inner-icon="mdi-key mdi-green" counter></v-text-field>
                    </v-col>
                  </v-row>
                  <v-container>
                    <v-row>
                      <v-col offset="2" size="9">
                        <v-btn color="blue" class="rounded-xl" @click=userlogin>
                          <v-icon left>mdi-account-check</v-icon>
                          LOG IN
                        </v-btn>
                      </v-col>

                      <v-col offset="" size="9" @click="$router.push({ name: 'Register' })">
                        <v-btn type="submit" color="green" class="rounded-xl">
                          <v-icon left>mdi-account-check</v-icon>
                          SIGN UP
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-layout>
            </v-container>
          </v-form>
        </v-col>
        <!-- start dialog -->
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Incorrect Controlno/Password
            </v-card-title>

            <v-card-text>
              {{ this.loginCorrection }}
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
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "App",

  data: () => ({
    dialog: false,
    loading: false,
    snackbar: false,
    passwordShow: false,
    userName: "",
    password: "",
    loginCorrection:''
  }),

  methods: {
    ...mapActions('users', ['Login']),
    submitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.snackbar = true;
        }, 3000);
      }

    },
    userlogin() {
      let data = new FormData;
      data.append('controlno', this.userName);
      data.append('password', this.password);
      
      this.Login(data).then(e => {
        if (e == 0) {
          this.loginCorrection="Incorrect Password!"
          this.dialog = true;
        }else if(e == 2){
          this.loginCorrection="No user account found!"
          this.dialog=true;
        } 
        else {

          this.$router.push('Dashboard');
        }
      });

    },
    
  },
};
</script>

  
<style scoped>
input[type="sample"] {

  border-bottom: 1px solid rgb(28, 110, 4);
  outline: none;
  color: rgb(28, 110, 4);
}

input[type="password"] {
  background: transparent;
  outline: none;
  color: rgb(28, 110, 4);
}

.custom-placeholer-color input::placeholder {
  color: rgb(28, 110, 4) !important;
  opacity: 1;
}

.custom-label-color .v-label {
  color: rgb(28, 110, 4);
  opacity: 1;
}

.custom-placeholer-color input,
.custom-label-color input {
  color: rgb(28, 110, 4) !important;
}

.v-sheet.v-card {
  border-radius: 25px 25px 25px 25px;
}

.v-btn {
  border-radius: 25px 25px 25px 25px;
}

h2 {
  color: rgb(28, 110, 4);
  -webkit-text-stroke-color: rgb(0, 0, 0);
  margin-top: 20px;
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 10px 10px 15px rgba(49, 47, 47, 0.15);
  box-shadow: 0 0 8px rgb(201, 181, 1);
}

.background {
  margin: 0;
  padding: 0;
  background-image: url("../assets/cover1.jpg") !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

.text-form {
  margin-top: 20px;
  color: rgb(28, 110, 4);
}
</style>
  
  
  
  