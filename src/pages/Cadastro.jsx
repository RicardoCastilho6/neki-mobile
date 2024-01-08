import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { cadastrar } from '../api/Api';
import CadastroStyles from '../styles/CadastroStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Cadastro = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroCadastro, setErroCadastro] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState (false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const navigation = useNavigation();

    const handleCadastro = async () => {
        try {
          
          if (!login || !senha || !confirmarSenha) {
            setErroCadastro('Preencha todos os campos obrigatórios.');
            return;
          }        
          if (senha !== confirmarSenha) {
            setErroCadastro('As senhas não coincidem.');
            return;
          } 
          const response = await cadastrar(login, senha);  
          setCadastroSucesso(true);
          setLogin('');
          setSenha('');
          setConfirmarSenha('');
          setErroCadastro(null); 
      
        } catch (error) {
          console.error('Erro no cadastro:', error);
          setErroCadastro('Erro ao cadastrar. Tente Novamente!');
        }
      };

    const handleMostrarSenhaChange = ()=> {
        setMostrarSenha(!mostrarSenha);
    }

    return (
        <View style={CadastroStyles.backgroundPage}>
          <View style={CadastroStyles.loginContainer}>
            <View style={{alignItems:'center'}}>
            <Text style={CadastroStyles.title}>Cadastro</Text>
            </View>
            
            <Text>Login:</Text>
            <TextInput
              style={CadastroStyles.input}
              value={login}
              onChangeText={(text) => setLogin(text)}
            />
            <Text>Senha:</Text>
            <TextInput
              style={CadastroStyles.input}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
            <Text>Confirmar Senha:</Text>
            <TextInput
              style={CadastroStyles.input}
              secureTextEntry={!mostrarSenha}
              value={confirmarSenha}
              onChangeText={(text) => setConfirmarSenha(text)}
            />
            {cadastroSucesso && (             
                <Text style={{color:'green'}}>Cadastro bem-sucedido!</Text>
            )}
            {erroCadastro && <Text style={CadastroStyles.errorText}>{erroCadastro}</Text>}
            <View style={CadastroStyles.mostraSenha}>
              <Text>Mostrar Senha</Text>
              <TouchableOpacity onPress={handleMostrarSenhaChange}>
              {mostrarSenha ? (
             <MaterialCommunityIcons name="checkbox-marked" size={24} color="green" />
             ) : (
               <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
            )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={CadastroStyles.buttonCadastro} onPress={handleCadastro}>
              <Text>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{alignItems:'center'}}>
          <Text style={CadastroStyles.link}>Ja possui conta? Faça Login!</Text>
          </View>
        </TouchableOpacity>
            
          </View>
        </View>
      );
    };
export default Cadastro;