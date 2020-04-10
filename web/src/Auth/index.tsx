import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { setAccessToken } from 'shared/utils/accessToken';

import Login from 'shared/components/Login';
import { Container, LoginWrapper } from './Styles';

const Auth = () => {
  const [invalidLoginAttempt, setInvalidLoginAttempt] = useState(0);
  const history = useHistory();
  const login = (
    data: LoginFormData,
    setComplete: (val: boolean) => void,
    setError: (field: string, eType: string, message: string) => void,
  ) => {
    fetch('http://localhost:3333/auth/login', {
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
        const { accessToken } = response;
        setAccessToken(accessToken);
        setComplete(true);
        history.push('/');
      }
    });
  };

  useEffect(() => {
    fetch('http://localhost:3333/auth/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async x => {
      const { status } = x;
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
