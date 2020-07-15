import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router';

import {setAccessToken} from 'shared/utils/accessToken';

import Login from 'shared/components/Login';
import {Container, LoginWrapper} from './Styles';
import UserIDContext from 'App/context';
import JwtDecode from 'jwt-decode';

const Auth = () => {
  const [invalidLoginAttempt, setInvalidLoginAttempt] = useState(0);
  const history = useHistory();
  const {setUserID} = useContext(UserIDContext);
  const login = (
    data: LoginFormData,
    setComplete: (val: boolean) => void,
    setError: (field: string, eType: string, message: string) => void,
  ) => {
    fetch('/auth/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    }).then(async x => {
      if (x.status === 401) {
        setInvalidLoginAttempt(invalidLoginAttempt + 1);
        setError('username', 'invalid', 'Invalid username');
        setError('password', 'invalid', 'Invalid password');
        setComplete(true);
      } else {
        const response = await x.json();
        const {accessToken} = response;
        const claims: JWTToken = JwtDecode(accessToken);
        setUserID(claims.userId);
        setComplete(true);
        setAccessToken(accessToken);

        history.push('/');
      }
    });
  };

  useEffect(() => {
    fetch('/auth/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async x => {
      const {status} = x;
      if (status === 200) {
        history.replace('/projects');
      }
    });
  }, []);

  return (
    <Container>
      <LoginWrapper>
        <Login onSubmit={login} />
      </LoginWrapper>
    </Container>
  );
};

export default Auth;
