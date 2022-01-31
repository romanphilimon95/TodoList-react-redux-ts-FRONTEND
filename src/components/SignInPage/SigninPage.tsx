import { useState } from 'react';
// components
import {
  Button,
  Label,
  Input,
} from 'reactstrap';
// redux
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { allowAccess } from '../../redux/slices/isAuthSlice';
// types and interfaces
import { AppDispatchType } from '../../redux/reduxTypes';
import { LoginPasswordInterface, token } from './SignInTypesAnsInterfaces';
// other
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import './SigninPage.scss';

const SigninPage = () => {
  const dispatch: AppDispatchType = useDispatch();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const history = useHistory();

  const register = async (): Promise<void> => {
    const regexLogin: RegExp = /[A-Za-z0-9]{6,}/;
    const regexPassword: RegExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$");

    if (login) {
      if (!regexLogin.test(login)) {
        dispatch(setAlert({
          alertData: {
            text: `The login must contain latin letters and numbers only. 
            It must have 6 symbols at least.`,
            isOpened: true,
          }
        }));
        return;
      }
    } else {
      dispatch(setAlert({
        alertData: {
          text: 'Please, print your login.',
          isOpened: true,
        }
      }));
      return;
    }

    if (password) {
      if (!regexPassword.test(password)) {
        setPassword('');
        dispatch(setAlert({
          alertData: {
            text: `The password must contain only latin letters and numbers. 
              It must have at least 1 capital and 1 lowercase letter, and 1 number.
              It mustn't be shorter than 6 symbols.`,
            isOpened: true,
          }
        }));
        return;
      }
    } else {
      dispatch(setAlert({
        alertData: {
          text: 'Please, print your password.',
          isOpened: true
        }
      }));
      return;
    }

    if (password !== repeatedPassword) {
      setRepeatedPassword('');
      dispatch(setAlert({
        alertData: {
          text: 'Password dismatch.',
          isOpened: true
        }
      }));
      return;
    }
    const url: string = `${process.env.REACT_APP_SERVER_URL}/createNewUser`;

    await axios.post<LoginPasswordInterface, AxiosResponse<token>>(url, {
      password,
      login,
    }, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(result => {
        const { data } = result;
        dispatch(allowAccess());
        localStorage.setItem('token', data.accessToken);
        history.push('/mainPage');
      })
      .catch(e => {
        if (e.message.endsWith('400')) {
          dispatch(setAlert({
            alertData: {
              text: 'Error 400. This login is already used',
              isOpened: true
            }
          }));
        } else {
          dispatch(setAlert({
            alertData: {
              text: e.message,
              isOpened: true
            }
          }));
        }
      });
  }

  const authoriseOrRegister = (): void => {
    isRegistration
      ? register()
      : authorise();
  }

  const authorise = async (): Promise<void> => {
    if (!login) {
      dispatch(setAlert({
        alertData: {
          text: 'Please, print your login.',
          isOpened: true,
        }
      }));
      return;
    }

    if (!password) {
      dispatch(setAlert({
        alertData: {
          text: 'Please, print your password.',
          isOpened: true
        }
      }));
      return;
    }
    const url: string = `${process.env.REACT_APP_SERVER_URL}/authorise`;

    await axios.post<LoginPasswordInterface, AxiosResponse<token>>(url, {
      login,
      password,
    }, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(result => {
        const { data } = result;
        dispatch(allowAccess());
        localStorage.setItem('token', data.accessToken);
        history.push('/mainPage');
      })
      .catch(e => {
        dispatch(setAlert({
          alertData: {
            text: e.message,
            isOpened: true
          }
        }));
      });
  }

  return (
    <div className="signin-page-wrapper">
      <div className="signin-central-window">
        <header>
          {isRegistration
            ? 'Register'
            : 'Sign In'
          }
        </header>
        <section>
          <div className="signin-input-wrapper">
            <Label
              for="login"
              bssize="lg"
            >
              Login
            </Label>
            <Input
              id="login"
              name="login"
              bssize="lg"
              placeholder="Enter your login, please"
              value={login}
              onChange={(e) => setLogin(e.currentTarget.value)}
              type="text"
            />
          </div>
          <div className="signin-input-wrapper">
            <Label
              for="password"
              bssize="lg"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              bssize="lg"
              placeholder="Enter your password, please"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
            />
          </div>
          {
            isRegistration &&
            <div className="signin-input-wrapper">
              <Label
                for="repeated-password"
                bssize="lg"
              >
                Repeate your password
              </Label>
              <Input
                id="repeated-password"
                name="repeated-password"
                bssize="lg"
                placeholder="Repeate your password, please"
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.currentTarget.value)}
                type="password"
              />
            </div>
          }
        </section>
        <footer>
          <Button
            color="primary"
            bssize="lg"
            onClick={authoriseOrRegister}
          >
            Submit
          </Button>
          <p
            onClick={() => setIsRegistration(!isRegistration)}
          >
            {
              isRegistration
                ? 'Go to the sign in page'
                : 'Go to the registration page'
            }
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SigninPage;