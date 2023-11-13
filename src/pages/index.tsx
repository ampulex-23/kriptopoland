import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import Features from '../components/Features';
import Header from '../components/Header';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import ReactModalLogin from 'react-modal-login';
import { facebookConfig, googleConfig } from "../config/social-config";
import Dashboard from '../components/Dashboard';
import { Lang, User } from '../types/types';
import cn from 'classnames';
import useConfig from '../hooks/useConfig';
import "react-modal-login/dist/react-modal-login.css";

const App = () => {
  
  const [state, setState] = useState({
    showModal: false,
    loggedIn: null,
    loading: false,
    error: false,
    initialTab: 'login',
    recoverPasswordSuccess: null as boolean | null,
  });

  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>(Lang.PL);

  const config = useConfig();

  if (!config) {
    return null;
  }

  const { rules } = config;

  const signOut = () => {
    setUser(null);
    setJwt(null);
  };

  const onLoginSuccess = () => {
    setState({
      ...state,
      showModal: false,
      error: false,
      loading: false,
    });
  };

  const onLoginFail = () => {
    setState({
      ...state,
      loading: false,
    });
  };

  const onLogin = async () => {
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
    if (!email || !password) {
      setState({
        ...state,
        error: true,
      });
    } else {
      const body = JSON.stringify({
        identifier: email,
        password
      });
      const response = await fetch('http://212.39.67.73:88/api/auth/local', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body
      });
      
      if (response.status === 200) {
        const { jwt: j, user: u } = await response.json();
        setJwt(j);
        setUser(u);
      }
      onLoginSuccess();
    }
  };

  const onRegister = () => {
    const login = (document.querySelector("#login") as HTMLInputElement).value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
    if (!login || !email || !password) {
      setState({
        ...state,
        error: true,
      });
    } else {
      onLoginSuccess();
    }
  };

  const onRecoverPassword = () => {
    const email = (document.querySelector("#email") as HTMLInputElement).value;

    if (!email) {
      setState({
        ...state,
        error: true,
        recoverPasswordSuccess: false,
      });
    } else {
      setState({
        ...state,
        error: false,
        recoverPasswordSuccess: true,
      });
    }
  };

  const openModal = (initialTab: string) => {
    setState({
      ...state,
      initialTab,
      showModal: true,
    });
  };
 

  const startLoading = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const finishLoading = () => {
    setState({
      ...state,
      loading: false,
    });
  };

  const afterTabsChange = () => {
    setState({
      ...state,
      error: false,
      recoverPasswordSuccess: false,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      showModal: false,
      error: false,
      loading: false,
    });
  };

  const isLoading = state.loading;
  return (
    <div className={cn('grid', 'gap-y-0', 'sm:gap-y-16', 'w-full')}>
      {!jwt && (
        <div className={`relative bg-background`}>
          <div
            className={cn(
              'relative',
              'z-10',
              'pb-8',
              'bg-background',
              'sm:pb-16',
              'md:pb-20',

              'max-w-[100vw]',
              'sm:max-w-full',
              'md:max-w-xl',
              'lg:max-w-xl',
              'xl:max-w-xl',
              '2xl:max-w-2xl',
              'sm:w-1/2',
              'lg:w-full',
              'lg:pb-28',
              'xl:pb-16',

              'ml-0',
              'sm:ml-0',
              'md:ml-5',
              'lg:ml-10',
              'xl:ml-20',
              '2xl:ml-40'
            )}
          >
            <Header
              config={config}
              onSignin={() => openModal('login')}
              lang={lang}
              onSetLang={(l: Lang) => setLang(l)}
            />
            <MainHero
              config={config}
              lang={lang}
              onSignin={() => openModal('login')}
            />
          </div>
          <div className={cn('visible', 'sm:visible', 'md:visible')}>
            <MainHeroImage lang={lang} config={config} />
          </div>
          <Canvas />
        </div>
      )}
      {jwt && user && (
        <Dashboard
          config={config}
          user={user}
          jwt={jwt}
          onSignOut={signOut}
          lang={lang}
          onSetLang={(l: Lang) => setLang(l)}
        />
      )}
      {!jwt && (
        <>
          <div
            className={cn(
              'bg-primary',
              'flex',
              'flex-row',
              'justify-center',
              'w-[100vw]'
            )}
          >
            <p
              className={cn(
                'text-white',
                'py-8',
                'text-sm',
                'sm:text-[2vw]',
                'font-bold',

                'px-8',
              )}
            >
              {rules[lang]}
            </p>
          </div>
          <LazyShow>
            <>
              <Features lang={lang} config={config} />
            </>
          </LazyShow>
          
          <ReactModalLogin
            visible={state.showModal}
            onCloseModal={closeModal}
            loading={isLoading}
            initialTab={state.initialTab}
            error={state.error}
            tabs={{
              afterChange: afterTabsChange,
            }}
            startLoading={startLoading}
            finishLoading={finishLoading}
            form={{
              onLogin,
              onRegister,
              onRecoverPassword,
              recoverPasswordSuccessLabel: state.recoverPasswordSuccess
                ? {
                    label: 'New password has been sent to your mailbox!',
                  }
                : null,
              recoverPasswordAnchor: {
                label: 'Forgot your password?',
              },
              loginBtn: {
                label: 'Sign in',
              },
              registerBtn: {
                label: 'Sign up',
              },
              recoverPasswordBtn: {
                label: 'Send new password',
              },
              loginInputs: [
                {
                  containerClass: 'RML-form-group',
                  label: 'Email',
                  type: 'email',
                  inputClass: 'RML-form-control',
                  id: 'email',
                  name: 'email',
                  placeholder: 'Email',
                },
                {
                  containerClass: 'RML-form-group',
                  label: 'Password',
                  type: 'password',
                  inputClass: 'RML-form-control',
                  id: 'password',
                  name: 'password',
                  placeholder: 'Password',
                },
              ],
              registerInputs: [
                {
                  containerClass: 'RML-form-group',
                  label: 'Nickname',
                  type: 'text',
                  inputClass: 'RML-form-control',
                  id: 'login',
                  name: 'login',
                  placeholder: 'Nickname',
                },
                {
                  containerClass: 'RML-form-group',
                  label: 'Email',
                  type: 'email',
                  inputClass: 'RML-form-control',
                  id: 'email',
                  name: 'email',
                  placeholder: 'Email',
                },
                {
                  containerClass: 'RML-form-group',
                  label: 'Password',
                  type: 'password',
                  inputClass: 'RML-form-control',
                  id: 'password',
                  name: 'password',
                  placeholder: 'Password',
                },
              ],
              recoverPasswordInputs: [
                {
                  containerClass: 'RML-form-group',
                  label: 'Email',
                  type: 'email',
                  inputClass: 'RML-form-control',
                  id: 'email',
                  name: 'email',
                  placeholder: 'Email',
                },
              ],
            }}
            separator={{
              label: 'or',
            }}
            providers={{
              facebook: {
                config: facebookConfig,
                onLoginSuccess,
                onLoginFail,
                inactive: isLoading,
                label: 'Continue with Facebook',
              },
              google: {
                config: googleConfig,
                onLoginSuccess,
                onLoginFail,
                inactive: isLoading,
                label: 'Continue with Google',
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default App;
