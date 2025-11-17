const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(`Senha: ${password}`);
  console.log(`Hash: ${hash}`);
  return hash;
}

// Gerar hashes para as senhas de teste
(async () => {
  console.log('\n=== SENHAS DE TESTE ===\n');
  
  console.log('PROFESSOR:');
  await hashPassword('professor123');
  
  console.log('\nALUNA:');
  await hashPassword('aluna123');
  
  console.log('\nADMIN:');
  await hashPassword('admin123');
})();
