import { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';

import {api} from '../../services/api'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background } from "./styles";

export function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert('Preencha todos os campos');
    }

    api.post('/users', {
      name,
      email,
      password
    }).then(() => {
      alert('Usuário cadastrado com sucesso');
      navigate('/');
    }).catch((error) => {
      if(error.response) {
        alert(error.response.data.error);
      } else {
        alert('Erro ao cadastrar usuário, tente novamente mais tarde');
      }
    })

  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input placeholder='Nome' icon={FiUser} onChange={e => setName(e.target.value)}/>
        <Input placeholder='E-mail' icon={FiMail} onChange={e => setEmail(e.target.value)}/>
        <Input placeholder='password' icon={FiLock} type="password" onChange={e => setPassword(e.target.value)}/>

        <Button title={"Cadastrar"} onClick={handleSignUp}/>

        <Link to={'/'}>Voltar para o login</Link>
      </Form>


    </Container>
  )
}
