import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { listar, deletarAssocia, atualiza, associar } from '../api/Api';
import SkillModal from '../components/SkillModal';  
import HomeStyles from '../styles/HomeStyles';
import Modal from '../components/Modal';

import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [usuarioSkills, setUsuarioSkills] = useState([]);
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isAdicionarSkillModalOpen, setIsAdicionarSkillModalOpen] = useState(false);
  const [novoLevel, setNovoLevel] = useState('');
  const navigation = useNavigation();
  const [erroAssociacao, setErroAssociacao] = useState(null);

  useEffect(() => {
    carregarSkills();
  }, []);

  const carregarSkills = async () => {
    try {
      const userId = await AsyncStorage.getItem('Id');
      const response = await listar(JSON.parse(userId));
      setUsuarioSkills(response.data);
    } catch (error) {
      console.error('Erro ao carregar as skills do usuário', error);
    }
  };

  const handleExcluirSkill = async (usuarioSkillId) => {
    try {
      await deletarAssocia(usuarioSkillId);
      console.log('id', usuarioSkillId)
      carregarSkills();
    
      
    } catch (error) {
      console.error('Erro ao excluir a skill do usuário', error);
    }
  };
  const handleAssociarSkill = async (skillId) => {
    try {
        const userId = await AsyncStorage.getItem('Id');       
        await associar(userId, skillId, 1);
        setErroAssociacao(null);
      carregarSkills();
    
    } catch (error) {      
      setErroAssociacao('Você ja possui essa Skill. Tente novamente.');
    }
  };

  const handleSalvarLevel = async (usuarioSkillId) => {
    try {
      const skillAtual = usuarioSkills.find((skill) => skill.id === usuarioSkillId);
      if (skillAtual) {
        console.log('levelentregue',novoLevel)
        const novaSkill = { ...skillAtual, level: novoLevel };
        await atualiza(usuarioSkillId, novaSkill);
        carregarSkills();
        setNovoLevel('');
      } else {
        console.error('Skill não encontrada para atualização');
      }
    } catch (error) {
      console.error('Erro ao atualizar o level da skill do usuário', error);
    }
  };

  const handleAbrirDetalhesModal = (skill) => {
    setSelectedSkill(skill);
    setIsDetalhesModalOpen(true);
  };

  const handleFecharDetalhesModal = () => {
    setSelectedSkill(null);
    setIsDetalhesModalOpen(false);
  };

  const handleAbrirAdicionarSkillModal = () => {
    setIsAdicionarSkillModalOpen(true);
  };

  const handleFecharAdicionarSkillModal = () => {
    setIsAdicionarSkillModalOpen(false);
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={HomeStyles.homeContainer}>
      <Text style={HomeStyles.title}>SKILLS</Text>
  
      <FlatList
        data={usuarioSkills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAbrirDetalhesModal(item)} style={HomeStyles.skillItem}>
            <Image style={HomeStyles.skillImage} source={{ uri: item.skill.imgUrl }} />
            <View style={HomeStyles.skillDetails}>
              <Text style={{fontSize: 30}}>{item.skill.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {erroAssociacao && <Text style={{ color: 'red', marginBottom: 10 }}>{erroAssociacao}</Text>}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleAbrirAdicionarSkillModal} style={HomeStyles.buttonAddSkill}>
          <Text style={{fontSize: 20,color:'white'}}>Adicionar Skill</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={HomeStyles.logoutButton}>
          <Text style={{fontSize: 20,color:'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      {isDetalhesModalOpen && (
        <SkillModal
          isVisible={isDetalhesModalOpen}
          onClose={handleFecharDetalhesModal}
          skill={selectedSkill}
          onDelete={handleExcluirSkill}
          onSaveLevel={handleSalvarLevel}
          novoLevel={novoLevel} 
          setNovoLevel={setNovoLevel} 
        />
      )}

      {isAdicionarSkillModalOpen && (
        <Modal
          onClose={handleFecharAdicionarSkillModal}
          onAssociar={handleAssociarSkill} 
        />
      )}
    </View>
  );
};

export default Home;