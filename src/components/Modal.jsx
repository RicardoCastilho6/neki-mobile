import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listarTodasSkills } from '../api/Api';
import { MaterialIcons } from '@expo/vector-icons';

const Modal = ({ onClose, onAssociar }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    carregarSkills();
  }, []);

  const carregarSkills = async () => {
    try {
      const response = await listarTodasSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Erro ao carregar as skills', error);
    }
  };

  const handleAssociar = (skillId) => {
   
    onAssociar(skillId);
    onClose(); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',width: '80%',marginTop:'-170%',height:'50%' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10,width: '100%',height:'100%' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecione uma Skill</Text>
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, marginVertical: 10 }}>{item.nome}</Text>
             <TouchableOpacity onPress={() => handleAssociar(item.id)}>
              <MaterialIcons name="add-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity onPress={onClose} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;