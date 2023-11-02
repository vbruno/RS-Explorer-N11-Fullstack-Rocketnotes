import { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import { useAuth } from '../../Hooks/auth'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background } from "./styles";

export function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn}  = useAuth();

  function handleSignIn() {
    if (!email || !password) {
      return alert('Preencha todos os campos');
    }

    signIn({email, password});
  }

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input placeholder='E-mail' icon={FiMail} onChange={e => setEmail(e.target.value)} />
        <Input placeholder='password' icon={FiLock} type="password" onChange={e => setPassword(e.target.value)}/>

        <Button title={"Entrar"} onClick={handleSignIn}/>

        <Link to={'/register'}>Criar conta</Link>
      </Form>

      <Background />
    </Container>
  )
}
