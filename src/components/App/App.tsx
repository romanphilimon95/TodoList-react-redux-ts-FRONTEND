// react-router-dom 
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// components
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import SigninPage from '../SignInPage/SigninPage';
import MainPage from '../MainPage/MainPage';
//types and interfaces
import { RefreshTokenResponseType } from './AppTypesAndInterfaces';
import { RootStateType } from '../../redux/reduxTypes';
// other
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import './App.css';
//declarations
declare module 'axios' {
  export interface AxiosRequestConfig {
    credentials: string;
  }
}
declare module 'react-router-dom';

//interceptors

axios.interceptors.request.use((req: AxiosRequestConfig<unknown>) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  return req;
})

axios.interceptors.response.use(
  (res: AxiosResponse<unknown, unknown>) => {
    return res;
  },
  async (err) => {

    if (err.response.status === 401) {
      try {
        const url: string = `${process.env.REACT_APP_SERVER_URL}/refreshToken`;
        const response: AxiosResponse<RefreshTokenResponseType, unknown> = await axios
          .get<RefreshTokenResponseType, AxiosResponse>(url, {
            withCredentials: true,
            credentials: 'include'
          });
        
        const token: string = response.data.accessToken;
        localStorage.setItem('token', token);

        return axios.request<AxiosRequestConfig<string>>(err.config);
      } catch (e) {
        console.log('not authorized');
      }
    } 
    
    throw err;
  }
);

// component

const App = () => {
  const access: boolean = useSelector(
    (state: RootStateType) => state.isAuth.access
  );

  return (
    <div className="App">
      <Switch>
        <Route path="/signinPage">
          <SigninPage />
        </Route>
        {
          access
            ? <Route path='/mainPage'>
                <MainPage />
              </Route>
            : <Redirect to="/signInPage" />
        }
        <Redirect from='/' to='/mainPage'></Redirect>
      </Switch>
      <ErrorAlert />
    </div>
  );
}

export default App;
