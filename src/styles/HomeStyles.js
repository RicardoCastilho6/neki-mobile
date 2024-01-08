import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  skillItem: {
    alignItems: 'center',
    marginBottom: 40,
  },
  skillImage: {
    width: 130,
    height: 70,
    marginRight: 16,
    borderRadius: 25,
  },
  levelInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    
  },
  buttonAddSkill: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 16,
  },
  titulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeStyles;