import { decodeToken } from "react-jwt";
import "./index.scss";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import * as yup from "yup";
import { useFormik } from "formik";
import { classNames } from 'primereact/utils';
import { login } from '../../api/api'

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { setLogin, setUserData } = useContext(UserContext);
  const loggedIn = localStorage.getItem("isLoggedIn")
  const user = JSON.parse(localStorage.getItem("user"))
  const decodedToken = decodeToken(user?.token)

  const initialValues = {
    username: "",
    password: "",
  }

  const validationSchema = yup.object().shape({
    username: yup.string('Campo precisa ser do tipo string').required("Campo obrigatório"),
    password: yup.string('Campo precisa ser do tipo string').required("Campo obrigatório")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  useEffect(() => {
    if (loggedIn && !!decodedToken && decodedToken?.name === user?.name) {
      setLogin(true);
      setUserData(user)
      navigate("/")
    }
  }, [decodedToken, loggedIn, navigate, setLogin, setUserData, user]);

  async function handleSubmit(values) {
    setLoading(true)
    try {
      const {token} = await login(values)
      toast.success('Tenha uma boa experiência!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUserData(Object.assign({}, { ...values, token }, { error: "" }))
      localStorage.setItem("user", JSON.stringify({ ...values, token }));
      localStorage.setItem("isLoggedIn", true);
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false)
      navigate("/")
    }
  }

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
      return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <div className='login'>
      {loading ? 
        <ProgressSpinner className="loading" style={{width: '150px', height: '150px'}} strokeWidth="4" fill="rgba(0,0,0,0)" animationDuration=".5s" />
      :
          <>
            <div className="container">
              <div className="form-box">
                <div className="header-form">
                  <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize: "110px", color: "#ba6820b3"}}></i></h4>
                  <div className="image"></div>
                </div>
                <div className="body-form">
                  <form onSubmit={formik.handleSubmit} className='loginForm'>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text loginIcon"><i className="fa fa-user"></i></span>
                      </div>
                      <InputText
                          name="username"
                          placeholder="Nome"
                          value={formik.values.username}
                          onChange={(e) => {
                            formik.setFieldValue('username', e.target.value);
                          }}
                          className={classNames({'p-invalid': isFormFieldInvalid('username'), 'form-control': true})}
                      />
                    </div>
                    <div>
                      {getFormErrorMessage('username')}
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text loginIcon"><i className="fa fa-lock"></i></span>
                      </div>
                      <Password
                          id="password"
                          toggleMask
                          name="password"
                          placeholder="Senha"
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                          }}
                          className={classNames({
                            'p-invalid': isFormFieldInvalid('password'),
                            'form-control': true,
                            'zeroPadding': true
                          })}
                      />
                    </div>
                    <div>
                      {getFormErrorMessage('password')}
                    </div>
                    <button
                        className="btn btn-secondary btn-block button"
                        type="submit"
                    >
                      ENTRAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  );
}