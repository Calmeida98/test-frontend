<template>
  <div class="app-content content">
    <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div class="bg-overlay"></div>
      <!-- auth-page content -->
      <div class="auth-page-content overflow-hidden pt-lg-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="card overflow-hidden">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="p-lg-5 p-4 auth-one-bg h-100">
                      <div class="bg-overlay"></div>
                      <div class="position-relative h-100 d-flex flex-column">
                        <div class="mb-4">
                          <a href="index.html" class="d-block text-center">
                            <img src="/static/assets/images/logo_asistur.png" alt="" height="300">
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->

                  <div class="col-lg-6">
                    <div class="p-lg-5 p-4">
                      <div>
                        <h5 class="text-primary">Bienvenido !</h5>
                        <p class="text-muted">Entre para continuar con la administracion de agua de marzo</p>
                      </div>

                      <div class="mt-4">
                        <div v-if="error" class="alert"
                             style="color:#ee5b5b;background-color:white;font-weight: bold;text-align: center"
                             role="alert">
                          <i class="fa fa-info-circle"></i><span style="margin: 1rem">{{ message_error }}</span>
                        </div>
                        <tc-form
                            nested="user"
                            :vobject="$v"
                            ref="form"
                            class="mt-3 mt-sm-5"
                        >
                          <div class="row">
                            <div class="col-12">
                              <tc-form-item>
                                <label class="control-label">Correo<span class="required_field">*</span></label>
                                <tc-input type="text" v-model.trim="user.email" name="email"
                                          placeholder="Nombre de usuario"
                                          class="login-input"/>
                              </tc-form-item>
                            </div>
                            <div class="col-12">
                              <tc-form-item>
                                <label class="control-label">Password<span class="required_field">*</span></label>
                                <tc-input type="password" name="password" v-model="user.password"
                                          placeholder="Password"/>
                              </tc-form-item>
                            </div>
                            <div class="col-12">
                              <div class="d-block d-sm-flex  align-items-center">
                               
                              </div>
                            </div>
                          </div>
                        </tc-form>
                        <div class="col-12 mt-3 offset-7">
                          <a-button type="button" class="btn btn-login text-uppercase" :loading="loading"
                                    @click="login_action">Entrar
                          </a-button>
                        </div>
                        <!--                        <div class="col-12 mt-3 offset-7">-->
                        <!--                          <a-button type="button" class="btn btn-login text-uppercase" :loading="loading"-->
                        <!--                                    @click="register">Register-->
                        <!--                          </a-button>-->
                        <!--                        </div>-->
                      </div>

                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </div>
      <!-- end auth page content -->

      <!-- footer -->
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <p class="mb-0">&copy;

                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- end Footer -->
    </div>
    <div class="content-overlay"></div>
  </div>
</template>

<script>
import {required,email} from 'vuelidate/lib/validators'
import '@/assets/css/authentication.css'

export default {
  name: 'Login',
  inject: {
    login: {
      default: () => {
      }
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  mounted() {
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      error: false,
      loading: false,
      message_error: 'Error en usuario o contraseña'
    }
  },
  methods: {
    async login_action() {
      this.error = false
      this.loading = true
      if (this.$refs.form.validate()) {
        await this.$store.site.login(this.user).then(async () => {
          this.login()
        }).catch((error) => {
          !error.response || error.response.status != 422 ? this.message_error = 'Unknow error, please contact with administrator' : ''
          this.error = true
        })
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.ant-btn:hover, .ant-btn:focus, .ant-btn:active {
  color: white;
  background-color: rgba(26, 74, 164, 0.97) !important;
  border-color: rgba(26, 74, 164, 0.97) !important;
}

.ant-btn, .ant-btn {
  color: white;
  background-color: #405189 !important;
  border-color: #405189 !important;
}

.content-body {
  height: 35rem !important;
  margin-top: 10rem !important;
  margin-left: 10% !important;
  margin-bottom: 5px !important;
}

.app-content {
  margin-left: 0px !important;
  overflow: hidden;
}
</style>

