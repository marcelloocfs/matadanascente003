// Configuração pública do site.
// Estas chaves ficam visíveis no navegador, e isso é esperado:
// - a chave "anon" do Supabase só consegue o que as regras de acesso do banco permitem (supabase/schema.sql);
// - o token do Cesium deve ser restrito ao domínio do site no painel do Cesium ion.
// Nunca coloque aqui a chave "service_role" do Supabase nem senhas.
window.CONFIG = {
  // Cesium ion → Access Tokens. Vazio = abertura com a Terra desenhada (sem satélite).
  cesiumToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImR6X05xZ21xb0d1elh1WlAiLCJqdGkiOiJhZjg3NDAxYi00ZjgyLTRmOTEtYjIwNC1mZDBhYWUwZDdhOWQiLCJpZCI6NTM1NjMxLCJzdWIiOiJNYXJjZWxsbyBDaGF2ZXMiLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiTWF0YSBkYSBuYXNjZW50ZSAiLCJpYXQiOjE3OTMwMjAxMDd9.lX7nI7B0u3tIhrACq7_2d0C2CIiZNJoC9xII5s_aW34',

  // Supabase → Project Settings → API. Vazio = modo demonstração (dados só no navegador).
  supabaseUrl: '',
  supabaseAnonKey: '',

  // Mata da Nascente, Monte Carmelo (MG): centro do muro, pelas coordenadas oficiais da prancha (data/loteamento.js).
  location: { lon: -47.510043, lat: -18.730444 },

  // Prédios e terreno fotorrealistas do Google na chegada (precisa do token do Cesium).
  // Desligado: no meio do voo o globo sumia antes de os prédios carregarem e a tela ficava preta.
  googleTiles: false,

  // Casas em GLB. Sem arquivo, o site usa as casas geradas por código.
  // rotateY (graus) e scale corrigem modelos exportados em outra orientação ou unidade.
  models: {
    sobrado: { url: 'models/casa_sobrado.glb' },
    // ipe:     { url: 'models/ipe.glb' },
    // jatoba:  { url: 'models/jatoba.glb' },
    // aroeira: { url: 'models/aroeira.glb', rotateY: 0, scale: 1 }
  }
};
