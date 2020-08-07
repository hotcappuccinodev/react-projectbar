import React, { useState } from 'react';
import AccessAccount from 'shared/undraw/AccessAccount';
import { User, Lock, Taskcafe } from 'shared/icons';
import { useForm } from 'react-hook-form';

import {
  Form,
  LogoWrapper,
  LogoTitle,
  ActionButtons,
  RegisterButton,
  FormError,
  FormIcon,
  FormLabel,
  FormTextInput,
  Wrapper,
  Column,
  LoginFormWrapper,
  LoginFormContainer,
  Title,
  SubTitle,
} from './Styles';

const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
const INITIALS_PATTERN = /[a-zA-Z]{2,3}/i;

const Register = ({ onSubmit }: RegisterProps) => {
  const [isComplete, setComplete] = useState(true);
  const { register, handleSubmit, errors, setError } = useForm<RegisterFormData>();
  const loginSubmit = (data: RegisterFormData) => {
    setComplete(false);
    onSubmit(data, setComplete, setError);
  };
  return (
    <Wrapper>
      <Column>
        <AccessAccount width={275} height={250} />
      </Column>
      <Column>
        <LoginFormWrapper>
          <LoginFormContainer>
            <LogoWrapper>
              <Taskcafe width={42} height={42} />
              <LogoTitle>Taskcafé</LogoTitle>
            </LogoWrapper>
            <Title>Register</Title>
            <SubTitle>Please create the system admin user</SubTitle>
            <Form onSubmit={handleSubmit(loginSubmit)}>
              <FormLabel htmlFor="fullname">
                Full name
                <FormTextInput
                  type="text"
                  id="fullname"
                  name="fullname"
                  ref={register({ required: 'Full name is required' })}
                />
                <FormIcon>
                  <User color="#c2c6dc" size={20} />
                </FormIcon>
              </FormLabel>
              {errors.username && <FormError>{errors.username.message}</FormError>}
              <FormLabel htmlFor="username">
                Username
                <FormTextInput
                  type="text"
                  id="username"
                  name="username"
                  ref={register({ required: 'Username is required' })}
                />
                <FormIcon>
                  <User color="#c2c6dc" size={20} />
                </FormIcon>
              </FormLabel>
              {errors.username && <FormError>{errors.username.message}</FormError>}
              <FormLabel htmlFor="email">
                Email
                <FormTextInput
                  type="text"
                  id="email"
                  name="email"
                  ref={register({
                    required: 'Email is required',
                    pattern: { value: EMAIL_PATTERN, message: 'Must be a valid email' },
                  })}
                />
                <FormIcon>
                  <User color="#c2c6dc" size={20} />
                </FormIcon>
              </FormLabel>
              {errors.email && <FormError>{errors.email.message}</FormError>}
              <FormLabel htmlFor="initials">
                Initials
                <FormTextInput
                  type="text"
                  id="initials"
                  name="initials"
                  ref={register({
                    required: 'Initials is required',
                    pattern: {
                      value: INITIALS_PATTERN,
                      message: 'Initials must be between 2 to 3 characters.',
                    },
                  })}
                />
                <FormIcon>
                  <User color="#c2c6dc" size={20} />
                </FormIcon>
              </FormLabel>
              {errors.initials && <FormError>{errors.initials.message}</FormError>}
              <FormLabel htmlFor="password">
                Password
                <FormTextInput
                  type="password"
                  id="password"
                  name="password"
                  ref={register({ required: 'Password is required' })}
                />
                <FormIcon>
                  <Lock width={20} height={20} />
                </FormIcon>
              </FormLabel>
              {errors.password && <FormError>{errors.password.message}</FormError>}
              <FormLabel htmlFor="password_confirm">
                Password (Confirm)
                <FormTextInput
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  ref={register({ required: 'Password (confirm) is required' })}
                />
                <FormIcon>
                  <Lock width={20} height={20} />
                </FormIcon>
              </FormLabel>
              {errors.password_confirm && <FormError>{errors.password_confirm.message}</FormError>}

              <ActionButtons>
                <RegisterButton type="submit" disabled={!isComplete}>
                  Register
                </RegisterButton>
              </ActionButtons>
            </Form>
          </LoginFormContainer>
        </LoginFormWrapper>
      </Column>
    </Wrapper>
  );
};

export default Register;
