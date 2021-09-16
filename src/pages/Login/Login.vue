<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4"> </v-col>
        <v-col cols="12" md="4" class="mt-16 set-shadow-login">
          <div class="text-center mt-10">
            <v-icon
              style="background: #686868;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: rgba(255, 255, 255, 0.5) 1px 2px 1px;
  font-size: 120px;"
              >mdi-file-document-edit-outline</v-icon
            >
          </div>
          <h2 class="text-center mt-5">แบบประเมินชุมชนสลัม</h2>
          <!-- <label class="pl-12">Username</label> -->
          <v-text-field
            label="Username"
            prepend-icon="fa-user"
            class="px-3"
            solo
            v-model.trim="username"
          ></v-text-field>
          <!-- <label class="pl-12">Password</label> -->
          <v-text-field
            label="รหัสผ่าน"
            prepend-icon="fa-lock"
            class="px-3"
            type="password"
            v-model.trim="password"
            solo
          ></v-text-field>
          <div class="mx-3 my-10">
            <v-btn
              color="primary"
              outlined
              block
              class="rounded-lg mb-3 elevation-4"
              x-large
              @click="login()"
              >เข้าสู่ระบบ</v-btn
            >
          </div>
        </v-col>
        <v-col cols="12" md="4"> </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="alert" color="error">
      Username หรือ Password ไม่ถูกต้อง
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="alert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import config from "../../config";
import { apiService } from "@/services/axios";
export default {
  name: "Login",
  data() {
    return {
      valid: true,
      loginTabs: "",
      email: "admin@flatlogic.com",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
        (v) => v.toLowerCase() === this.email,
      ],
      createFullName: "John Smith",
      createEmail: "john@flatlogic.com",
      username: "",
      password: "",
      passRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Min 6 characters",
      ],
      alert: false,
      message: "",
    };
  },
  methods: {
    ...mapActions("register", ["registerUser", "registerError"]),
    ...mapActions("auth", [
      "loginUser",
      "receiveToken",
      "receiveLogin",
      "updateLoginStatus",
    ]),
    async login() {
      // const email = this.email;
      // const password = this.password;
      // this.loginUser({email, password});
      // this.$router.push("/map");
      let body = {
        username: this.username,
        password: this.password,
      };
      let data = await apiService.post({
        path: "login",
        body: body,
      });
      if (data.response) {
        this.updateLoginStatus(true);
        this.$router.push("/map");
      } else {
        this.alert = true;
      }
    },
    googleLogin() {
      this.loginUser({ social: "google" });
    },
    register() {
      const email = this.createEmail;
      const password = this.createPassword;

      this.registerUser({ creds: { email, password } });
      setTimeout(() => {
        this.loginTabs = "tab-login";
      }, 1500);
    },
    validate() {
      if (this.$refs.log.validate()) {
        window.localStorage.setItem("authenticated", true);
        this.$router.push("/user/profile");
      }
    },
  },
  computed: {
    ...mapState("auth", {
      isFetching: (state) => state.isFetching,
      errorMessage: (state) => state.errorMessage,
    }),
    ...mapState("register", {
      regIsFetching: (state) => state.isFetching,
      regErrorMessage: (state) => state.errorMessage,
    }),
  },

  watch: {
    errorMessage() {
      this.message = this.errorMessage;
      this.alert = true;
    },
    regErrorMessage() {
      this.message = this.regErrorMessage;
      this.alert = true;
    },
  },

  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.receiveToken(token);
    } else {
      if (this.isAuthenticated(localStorage.getItem("token"))) {
        this.receiveLogin();
      }
    }
  },
  mounted() {
    const creds = config.auth;
    this.email = creds.email;
    // this.password = creds.password;
  },
};
</script>

<style src="./Login.scss" lang="scss" />
