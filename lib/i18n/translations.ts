export type Locale = "en" | "pt" | "es" | "it" | "fr"

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Espanol",
  it: "Italiano",
  fr: "Francais",
}

export const localeFlags: Record<Locale, string> = {
  en: "GB",
  pt: "BR",
  es: "ES",
  it: "IT",
  fr: "FR",
}

const translations = {
  // ===== COMMON / NAV =====
  nav: {
    dashboard: { en: "Dashboard", pt: "Painel", es: "Panel", it: "Pannello", fr: "Tableau de bord" },
    leaderboard: { en: "Leaderboard", pt: "Classificação", es: "Clasificacion", it: "Classifica", fr: "Classement" },
    rules: { en: "Rules", pt: "Regras", es: "Reglas", it: "Regole", fr: "Regles" },
    admin: { en: "Admin", pt: "Admin", es: "Admin", it: "Admin", fr: "Admin" },
    matches: { en: "Matches", pt: "Partidas", es: "Partidos", it: "Partite", fr: "Matchs" },
    users: { en: "Users", pt: "Usuários", es: "Usuarios", it: "Utenti", fr: "Utilisateurs" },
    logout: { en: "Logout", pt: "Sair", es: "Cerrar sesion", it: "Esci", fr: "Deconnexion" },
    login: { en: "Login", pt: "Entrar", es: "Iniciar sesion", it: "Accedi", fr: "Connexion" },
    signUp: { en: "Sign Up", pt: "Cadastrar", es: "Registrarse", it: "Registrati", fr: "Inscription" },
    subtitle: { en: "Score Prediction Challenge", pt: "Desafio de Previsão de Placares", es: "Desafio de Prediccion de Marcadores", it: "Sfida di Previsione dei Risultati", fr: "Defi de Prediction de Scores" },
    calendar: { en: "Calendar", pt: "Calendário", es: "Calendario", it: "Calendario", fr: "Calendrier" },
  },

  // ===== HOME PAGE =====
  home: {
    title: { en: "World Cup 2026", pt: "Copa do Mundo 2026", es: "Copa del Mundo 2026", it: "Coppa del Mondo 2026", fr: "Coupe du Monde 2026" },
    subtitle: { en: "Score Prediction Challenge", pt: "Desafio de Previsão de Placares", es: "Desafio de Prediccion de Marcadores", it: "Sfida di Previsione dei Risultati", fr: "Defi de Prediction de Scores" },
    description: { en: "Predict match scores, compete with friends, and climb the leaderboard. Test your football knowledge and win bragging rights!", pt: "Preveja os placares, compita com amigos e suba na classificação. Teste seu conhecimento sobre futebol e conquiste o direito de se gabar!", es: "Predice marcadores, compite con amigos y sube en la clasificacion. Pon a prueba tu conocimiento futbolistico y gana el derecho de presumir!", it: "Prevedi i risultati, competi con gli amici e scala la classifica. Metti alla prova le tue conoscenze calcistiche e vinci il diritto di vantarti!", fr: "Predisez les scores, affrontez vos amis et grimpez au classement. Testez vos connaissances en football et gagnez le droit de vous vanter !" },
    predictScores: { en: "Predict Scores", pt: "Preveja Placares", es: "Predice Marcadores", it: "Prevedi Risultati", fr: "Predisez les Scores" },
    predictScoresDesc: { en: "Submit your predictions for every World Cup match", pt: "Envie suas previsões para cada jogo da Copa do Mundo", es: "Envia tus predicciones para cada partido del Mundial", it: "Invia le tue previsioni per ogni partita della Coppa del Mondo", fr: "Soumettez vos predictions pour chaque match de la Coupe du Monde" },
    earnPoints: { en: "Earn Points", pt: "Ganhe Pontos", es: "Gana Puntos", it: "Guadagna Punti", fr: "Gagnez des Points" },
    earnPointsDesc: { en: "Get 25 points for exact scores, 10 point for correct winners", pt: "Ganhe 25 pontos por placares exatos, 10 pontos por vencedor correto", es: "Obtiene 25 puntos por marcadores exactos, 10 puntos por ganador correcto", it: "Ottieni 25 punti per risultati esatti, 10 punti per vincitore corretto", fr: "Obtenez 25 points pour les scores exacts, 10 points pour le bon vainqueur" },
    compete: { en: "Compete", pt: "Compita", es: "Compite", it: "Competi", fr: "Rivalisez" },
    competeDesc: { en: "Climb the leaderboard and become the prediction champion", pt: "Suba na classificação e torne-se o campeão de previsões", es: "Sube en la clasificacion y conviertete en el campeon de predicciones", it: "Scala la classifica e diventa il campione di previsioni", fr: "Grimpez au classement et devenez le champion des predictions" },
    getStarted: { en: "Get Started", pt: "Começar", es: "Comenzar", it: "Inizia", fr: "Commencer" },
    viewLeaderboard: { en: "View Leaderboard", pt: "Ver Classificação", es: "Ver Clasificacion", it: "Vedi Classifica", fr: "Voir le Classement" },
    scoringRules: { en: "Scoring Rules", pt: "Regras de Pontuação", es: "Reglas de Puntuacion", it: "Regole di Punteggio", fr: "Regles de Points" },
  },

  // ===== AUTH =====
  auth: {
    loginTitle: { en: "Login", pt: "Entrar", es: "Iniciar sesion", it: "Accedi", fr: "Connexion" },
    loginDesc: { en: "Enter your credentials to access your predictions", pt: "Insira suas credenciais para acessar suas previsões", es: "Ingresa tus credenciales para acceder a tus predicciones", it: "Inserisci le tue credenziali per accedere alle tue previsioni", fr: "Entrez vos identifiants pour acceder a vos predictions" },
    email: { en: "Email", pt: "E-mail", es: "Correo electronico", it: "Email", fr: "E-mail" },
    password: { en: "Password", pt: "Senha", es: "Contrasena", it: "Password", fr: "Mot de passe" },
    repeatPassword: { en: "Repeat Password", pt: "Repetir Senha", es: "Repetir Contrasena", it: "Ripeti Password", fr: "Repeter le mot de passe" },
    loggingIn: { en: "Logging in...", pt: "Entrando...", es: "Iniciando sesion...", it: "Accesso in corso...", fr: "Connexion en cours..." },
    noAccount: { en: "Don't have an account?", pt: "Não tem uma conta?", es: "No tienes una cuenta?", it: "Non hai un account?", fr: "Vous n'avez pas de compte ?" },
    signUpTitle: { en: "Sign up", pt: "Cadastro", es: "Registro", it: "Registrazione", fr: "Inscription" },
    signUpDesc: { en: "Create your account to start predicting", pt: "Crie sua conta para começar a prever", es: "Crea tu cuenta para empezar a predecir", it: "Crea il tuo account per iniziare a prevedere", fr: "Creez votre compte pour commencer a predire" },
    displayName: { en: "Display Name", pt: "Nome de Exibição", es: "Nombre Visible", it: "Nome Visualizzato", fr: "Nom d'affichage" },
    yourName: { en: "Your name", pt: "Seu nome", es: "Tu nombre", it: "Il tuo nome", fr: "Votre nom" },
    creatingAccount: { en: "Creating account...", pt: "Criando conta...", es: "Creando cuenta...", it: "Creazione account...", fr: "Creation du compte..." },
    alreadyHaveAccount: { en: "Already have an account?", pt: "Já tem uma conta?", es: "Ya tienes una cuenta?", it: "Hai gia un account?", fr: "Vous avez deja un compte ?" },
    passwordsNoMatch: { en: "Passwords do not match", pt: "As senhas não coincidem", es: "Las contrasenas no coinciden", it: "Le password non corrispondono", fr: "Les mots de passe ne correspondent pas" },
    checkEmail: { en: "Check your email", pt: "Verifique seu e-mail", es: "Revisa tu correo", it: "Controlla la tua email", fr: "Verifiez votre e-mail" },
    confirmAccount: { en: "Confirm your account to continue", pt: "Confirme sua conta para continuar", es: "Confirma tu cuenta para continuar", it: "Conferma il tuo account per continuare", fr: "Confirmez votre compte pour continuer" },
    checkEmailDesc: { en: "We've sent you a confirmation email. Please check your inbox and click the link to verify your account before signing in.", pt: "Enviamos um e-mail de confirmação. Por favor, verifique sua caixa de entrada e clique no link para verificar sua conta antes de entrar.", es: "Te hemos enviado un correo de confirmacion. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta antes de iniciar sesion.", it: "Ti abbiamo inviato un'email di conferma. Controlla la tua casella di posta e clicca sul link per verificare il tuo account prima di accedere.", fr: "Nous vous avons envoye un e-mail de confirmation. Veuillez verifier votre boite de reception et cliquer sur le lien pour verifier votre compte avant de vous connecter." },
    goToLogin: { en: "Go to Login", pt: "Ir para Login", es: "Ir al Login", it: "Vai al Login", fr: "Aller a la connexion" },
    authError: { en: "Authentication Error", pt: "Erro de Autenticação", es: "Error de Autenticacion", it: "Errore di Autenticazione", fr: "Erreur d'authentification" },
    unspecifiedError: { en: "An unspecified error occurred during authentication.", pt: "Ocorreu um erro não especificado durante a autenticação.", es: "Ocurrio un error no especificado durante la autenticacion.", it: "Si e verificato un errore non specificato durante l'autenticazione.", fr: "Une erreur non specifiee s'est produite lors de l'authentification." },
    backToLogin: { en: "Back to Login", pt: "Voltar ao Login", es: "Volver al Login", it: "Torna al Login", fr: "Retour a la connexion" },
    invalidCredentials: { en: "Invalid email or password.", pt: "E-mail ou senha inválidos.", es: "Correo o contrasena invalidos.", it: "Email o password non validi.", fr: "E-mail ou mot de passe invalide." },
    genericAuthError: { en: "An error occurred. Please try again.", pt: "Ocorreu um erro. Tente novamente.", es: "Ocurrio un error. Intentalo de nuevo.", it: "Si e verificato un errore. Riprova.", fr: "Une erreur s'est produite. Veuillez reessayer." },
    emailAlreadyInUse: { en: "This email is already registered.", pt: "Este e-mail já está cadastrado.", es: "Este correo ya esta registrado.", it: "Questa email e gia registrata.", fr: "Cet e-mail est deja enregistre." },
    displayNameTooShort: { en: "Name must be at least 2 characters.", pt: "O nome deve ter pelo menos 2 caracteres.", es: "El nombre debe tener al menos 2 caracteres.", it: "Il nome deve avere almeno 2 caratteri.", fr: "Le nom doit comporter au moins 2 caracteres." },
    displayNameTooLong: { en: "Name must be 50 characters or less.", pt: "O nome deve ter no máximo 50 caracteres.", es: "El nombre debe tener 50 caracteres o menos.", it: "Il nome deve avere al massimo 50 caratteri.", fr: "Le nom ne doit pas depasser 50 caracteres." },
    forgotPassword: { en: "Forgot your password?", pt: "Esqueceu sua senha?", es: "Olvido su contrasena?", it: "Hai dimenticato la password?", fr: "Mot de passe oublie ?" },
    forgotPasswordTitle: { en: "Reset Password", pt: "Redefinir Senha", es: "Restablecer Contrasena", it: "Reimposta Password", fr: "Reinitialiser le mot de passe" },
    forgotPasswordDesc: { en: "Enter your email and we'll send you a link to reset your password.", pt: "Insira seu e-mail e enviaremos um link para redefinir sua senha.", es: "Ingresa tu correo y te enviaremos un enlace para restablecer tu contrasena.", it: "Inserisci la tua email e ti invieremo un link per reimpostare la password.", fr: "Entrez votre e-mail et nous vous enverrons un lien pour reinitialiser votre mot de passe." },
    sendResetLink: { en: "Send Reset Link", pt: "Enviar Link de Redefinição", es: "Enviar Enlace", it: "Invia Link di Reimpostazione", fr: "Envoyer le lien" },
    sendingResetLink: { en: "Sending...", pt: "Enviando...", es: "Enviando...", it: "Invio in corso...", fr: "Envoi en cours..." },
    resetLinkSent: { en: "Reset link sent!", pt: "Link enviado!", es: "Enlace enviado!", it: "Link inviato!", fr: "Lien envoye !" },
    resetLinkSentDesc: { en: "Check your email for a link to reset your password. The link expires in 1 hour.", pt: "Verifique seu e-mail para encontrar o link de redefinição de senha. O link expira em 1 hora.", es: "Revisa tu correo para encontrar el enlace de restablecimiento. El enlace expira en 1 hora.", it: "Controlla la tua email per il link di reimpostazione. Il link scade tra 1 ora.", fr: "Verifiez votre e-mail pour trouver le lien de reinitialisation. Le lien expire dans 1 heure." },
    newPassword: { en: "New Password", pt: "Nova Senha", es: "Nueva Contrasena", it: "Nuova Password", fr: "Nouveau mot de passe" },
    confirmNewPassword: { en: "Confirm New Password", pt: "Confirmar Nova Senha", es: "Confirmar Nueva Contrasena", it: "Conferma Nuova Password", fr: "Confirmer le nouveau mot de passe" },
    updatePassword: { en: "Update Password", pt: "Atualizar Senha", es: "Actualizar Contrasena", it: "Aggiorna Password", fr: "Mettre a jour le mot de passe" },
    updatingPassword: { en: "Updating...", pt: "Atualizando...", es: "Actualizando...", it: "Aggiornamento...", fr: "Mise a jour..." },
    passwordUpdated: { en: "Password updated!", pt: "Senha atualizada!", es: "Contrasena actualizada!", it: "Password aggiornata!", fr: "Mot de passe mis a jour !" },
    passwordUpdatedDesc: { en: "Your password has been updated. You can now sign in with your new password.", pt: "Sua senha foi atualizada. Agora você pode entrar com sua nova senha.", es: "Tu contrasena ha sido actualizada. Ahora puedes iniciar sesion con tu nueva contrasena.", it: "La tua password e stata aggiornata. Ora puoi accedere con la tua nuova password.", fr: "Votre mot de passe a ete mis a jour. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe." },
    passwordMinLength: { en: "Password must be at least 8 characters.", pt: "A senha deve ter pelo menos 8 caracteres.", es: "La contrasena debe tener al menos 8 caracteres.", it: "La password deve avere almeno 8 caratteri.", fr: "Le mot de passe doit comporter au moins 8 caracteres." },
    resetLinkExpired: { en: "This reset link has expired or is invalid. Please request a new one.", pt: "Este link de redefinição expirou ou é inválido. Por favor, solicite um novo.", es: "Este enlace de restablecimiento expiro o es invalido. Por favor, solicita uno nuevo.", it: "Questo link di reimpostazione e scaduto o non e valido. Richiedine uno nuovo.", fr: "Ce lien de reinitialisation a expire ou est invalide. Veuillez en demander un nouveau." },
  },

  // ===== PROFILE =====
  profile: {
    title: { en: "My Profile", pt: "Meu Perfil", es: "Mi Perfil", it: "Il Mio Profilo", fr: "Mon Profil" },
    subtitle: { en: "Manage your account settings", pt: "Gerencie as configurações da sua conta", es: "Gestiona la configuracion de tu cuenta", it: "Gestisci le impostazioni del tuo account", fr: "Gerez les parametres de votre compte" },
    accountInfo: { en: "Account Information", pt: "Informações da Conta", es: "Informacion de la Cuenta", it: "Informazioni Account", fr: "Informations du Compte" },
    changePassword: { en: "Change Password", pt: "Alterar Senha", es: "Cambiar Contrasena", it: "Cambia Password", fr: "Changer le mot de passe" },
    currentPassword: { en: "Current Password", pt: "Senha Atual", es: "Contrasena Actual", it: "Password Attuale", fr: "Mot de passe actuel" },
    saveChanges: { en: "Save Changes", pt: "Salvar Alterações", es: "Guardar Cambios", it: "Salva Modifiche", fr: "Enregistrer" },
    saving: { en: "Saving...", pt: "Salvando...", es: "Guardando...", it: "Salvataggio...", fr: "Enregistrement..." },
    profileUpdated: { en: "Profile updated successfully!", pt: "Perfil atualizado com sucesso!", es: "Perfil actualizado con exito!", it: "Profilo aggiornato con successo!", fr: "Profil mis a jour avec succes !" },
    passwordChanged: { en: "Password changed successfully!", pt: "Senha alterada com sucesso!", es: "Contrasena cambiada con exito!", it: "Password cambiata con successo!", fr: "Mot de passe change avec succes !" },
    passwordMismatch: { en: "New passwords do not match.", pt: "As novas senhas não coincidem.", es: "Las nuevas contrasenas no coinciden.", it: "Le nuove password non corrispondono.", fr: "Les nouveaux mots de passe ne correspondent pas." },
    leaveBlankPassword: { en: "Leave blank to keep current password", pt: "Deixe em branco para manter a senha atual", es: "Deja en blanco para mantener la contrasena actual", it: "Lascia vuoto per mantenere la password attuale", fr: "Laissez vide pour conserver le mot de passe actuel" },
  },

  // ===== DASHBOARD =====
  dashboard: {
    title: { en: "Your Predictions", pt: "Suas Previsões", es: "Tus Predicciones", it: "Le Tue Previsioni", fr: "Vos Predictions" },
    subtitle: { en: "Submit your score predictions before each match starts", pt: "Envie suas previsões de placar antes de cada jogo começar", es: "Envia tus predicciones de marcador antes de que comience cada partido", it: "Invia le tue previsioni di risultato prima dell'inizio di ogni partita", fr: "Soumettez vos predictions de score avant le debut de chaque match" },
    noMatches: { en: "No matches available yet. Check back soon!", pt: "Nenhuma partida disponível ainda. Volte em breve!", es: "Aun no hay partidos disponibles. Vuelve pronto!", it: "Nessuna partita disponibile ancora. Torna presto!", fr: "Aucun match disponible pour le moment. Revenez bientot !" },
    matchStarted: { en: "Match has started. Predictions are locked.", pt: "A partida começou. As previsões estão bloqueadas.", es: "El partido ha comenzado. Las predicciones estan bloqueadas.", it: "La partita e iniziata. Le previsioni sono bloccate.", fr: "Le match a commence. Les predictions sont verrouillees." },
    yourPrediction: { en: "Your Prediction:", pt: "Sua Previsão:", es: "Tu Prediccion:", it: "La Tua Previsione:", fr: "Votre Prediction :" },
    pointsEarned: { en: "Points earned:", pt: "Pontos ganhos:", es: "Puntos obtenidos:", it: "Punti guadagnati:", fr: "Points gagnes :" },
    saving: { en: "Saving...", pt: "Salvando...", es: "Guardando...", it: "Salvataggio...", fr: "Enregistrement..." },
    updatePrediction: { en: "Update Prediction", pt: "Atualizar Previsão", es: "Actualizar Prediccion", it: "Aggiorna Previsione", fr: "Mettre a jour la prediction" },
    submitPrediction: { en: "Submit Prediction", pt: "Enviar Previsão", es: "Enviar Prediccion", it: "Invia Previsione", fr: "Soumettre la prediction" },
  },

  // ===== CALENDAR =====
  calendar: {
    title: { en: "Match Calendar", pt: "Calendário de Partidas", es: "Calendario de Partidos", it: "Calendario Partite", fr: "Calendrier des Matchs" },
    subtitle: { en: "View all matches organized by date", pt: "Veja todas as partidas organizadas por data", es: "Ver todos los partidos organizados por fecha", it: "Visualizza tutte le partite organizzate per data", fr: "Voir tous les matchs organises par date" },
    noMatches: { en: "No matches scheduled yet.", pt: "Nenhuma partida agendada ainda.", es: "Aun no hay partidos programados.", it: "Nessuna partita programmata ancora.", fr: "Aucun match programme pour le moment." },
    finalScore: { en: "Final", pt: "Final", es: "Final", it: "Finale", fr: "Final" },
    scheduled: { en: "Scheduled", pt: "Agendado", es: "Programado", it: "Programmata", fr: "Programme" },
  },

  // ===== LEADERBOARD =====
  leaderboard: {
    title: { en: "Leaderboard", pt: "Classificação", es: "Clasificacion", it: "Classifica", fr: "Classement" },
    subtitle: { en: "See who's leading the prediction challenge", pt: "Veja quem lidera o desafio de previsões", es: "Mira quien lidera el desafio de predicciones", it: "Scopri chi guida la sfida di previsioni", fr: "Decouvrez qui mene le defi de predictions" },
    rankings: { en: "Rankings", pt: "Classificação", es: "Clasificacion", it: "Classifica", fr: "Classement" },
    rankingsDesc: { en: "Players ranked by total points earned", pt: "Jogadores classificados por pontos totais", es: "Jugadores clasificados por puntos totales", it: "Giocatori classificati per punti totali", fr: "Joueurs classes par points totaux" },
    rank: { en: "Rank", pt: "Posição", es: "Posicion", it: "Posizione", fr: "Rang" },
    player: { en: "Player", pt: "Jogador", es: "Jugador", it: "Giocatore", fr: "Joueur" },
    predictions: { en: "Predictions", pt: "Previsões", es: "Predicciones", it: "Previsioni", fr: "Predictions" },
    points: { en: "Points", pt: "Pontos", es: "Puntos", it: "Punti", fr: "Points" },
    noPredictions: { en: "No predictions yet. Be the first to join!", pt: "Nenhuma previsão ainda. Seja o primeiro a participar!", es: "Aun no hay predicciones. Se el primero en participar!", it: "Nessuna previsione ancora. Sii il primo a partecipare!", fr: "Aucune prediction pour le moment. Soyez le premier a participer !" },
    wantToCompete: { en: "Want to compete?", pt: "Quer competir?", es: "Quieres competir?", it: "Vuoi competere?", fr: "Vous voulez concourir ?" },
    joinChallenge: { en: "Join the Challenge", pt: "Participe do Desafio", es: "Unete al Desafio", it: "Unisciti alla Sfida", fr: "Rejoignez le Defi" },
  },

  // ===== SCORING RULES =====
  scoring: {
    title: { en: "Scoring Rules", pt: "Regras de Pontuação", es: "Reglas de Puntuacion", it: "Regole di Punteggio", fr: "Regles de Points" },
    subtitle: { en: "Learn how points are awarded", pt: "Aprenda como os pontos são concedidos", es: "Aprende como se otorgan los puntos", it: "Scopri come vengono assegnati i punti", fr: "Decouvrez comment les points sont attribues" },
    pointSystem: { en: "Point System", pt: "Sistema de Pontuação", es: "Sistema de Puntuacion", it: "Sistema di Punteggio", fr: "Systeme de Points" },
    pointSystemDesc: { en: "How you earn points for your predictions", pt: "Como você ganha pontos com suas previsões", es: "Como ganas puntos con tus predicciones", it: "Come guadagni punti con le tue previsioni", fr: "Comment vous gagnez des points pour vos predictions" },
    exactScore: { en: "Exact Score", pt: "Placar Exato", es: "Marcador Exacto", it: "Risultato Esatto", fr: "Score Exact" },
    exactScoreDesc: { en: "You correctly predicted the exact score. For example, if you predict 2-1 and the match ends 2-1, you earn 25 points.", pt: "Você previu corretamente o placar exato. Por exemplo, se você prevê 2-1 e o jogo termina 2-1, você ganha 25 pontos.", es: "Predijiste correctamente el marcador exacto. Por ejemplo, si predices 2-1 y el partido termina 2-1, ganas 25 puntos.", it: "Hai previsto correttamente il risultato esatto. Ad esempio, se prevedi 2-1 e la partita finisce 2-1, guadagni 25 punti.", fr: "Vous avez correctement predit le score exact. Par exemple, si vous predisez 2-1 et le match se termine 2-1, vous gagnez 25 points." },
    winnerAndWinnerGoals: { en: "Match Winner & Winner's Goals", pt: "Vencedor e Gols do Vencedor", es: "Ganador y Goles del Ganador", it: "Vincitore e Gol del Vincitore", fr: "Vainqueur et Buts du Vainqueur" },
    winnerAndWinnerGoalsDesc: { en: "You correctly predicted the winner and the number of goals for the winning team. This is not valid for a draw. For example, if you predict 2-0 and the match ends 2-1, you earn 18 points.", pt: "Você previu corretamente o vencedor e o número de gols da equipe vencedora. Não vale para empates. Por exemplo, se você prevê 2-0 e o jogo termina 2-1, você ganha 18 pontos.", es: "Predijiste correctamente al ganador y el numero de goles del equipo ganador. No valido para empates. Por ejemplo, si predices 2-0 y el partido termina 2-1, ganas 18 puntos.", it: "Hai previsto correttamente il vincitore e il numero di gol della squadra vincente. Non valido per i pareggi. Ad esempio, se prevedi 2-0 e la partita finisce 2-1, guadagni 18 punti.", fr: "Vous avez correctement predit le vainqueur et le nombre de buts de l'equipe gagnante. Non valable pour un match nul. Par exemple, si vous predisez 2-0 et le match se termine 2-1, vous gagnez 18 points." },
    winnerAndGoalDiff: { en: "Match Winner & Goal Difference", pt: "Vencedor e Saldo de Gols", es: "Ganador y Diferencia de Goles", it: "Vincitore e Differenza Reti", fr: "Vainqueur et Difference de Buts" },
    winnerAndGoalDiffDesc: { en: "You correctly predicted the winner and the goal difference. For example, if you predict 3-1 and the match ends 2-0, you earn 15 points (both have a difference of 2).", pt: "Você previu corretamente o vencedor e o saldo de gols. Por exemplo, se você prevê 3-1 e o jogo termina 2-0, você ganha 15 pontos (ambos com diferença de 2).", es: "Predijiste correctamente al ganador y la diferencia de goles. Por ejemplo, si predices 3-1 y el partido termina 2-0, ganas 15 puntos (ambos con diferencia de 2).", it: "Hai previsto correttamente il vincitore e la differenza reti. Ad esempio, se prevedi 3-1 e la partita finisce 2-0, guadagni 15 punti (entrambi con differenza di 2).", fr: "Vous avez correctement predit le vainqueur et la difference de buts. Par exemple, si vous predisez 3-1 et le match se termine 2-0, vous gagnez 15 points (les deux ont une difference de 2)." },
    correctDraw: { en: "Correct Draw", pt: "Empate Correto", es: "Empate Correcto", it: "Pareggio Corretto", fr: "Match Nul Correct" },
    correctDrawDesc: { en: "You correctly predicted the match would be a draw, but not the exact score. For example, if you predict 2-2 and the match ends 1-1, you earn 15 points.", pt: "Você previu corretamente que o jogo terminaria em empate, mas não o placar exato. Por exemplo, se você prevê 2-2 e o jogo termina 1-1, você ganha 15 pontos.", es: "Predijiste correctamente que el partido terminaria en empate, pero no el marcador exacto. Por ejemplo, si predices 2-2 y el partido termina 1-1, ganas 15 puntos.", it: "Hai previsto correttamente che la partita sarebbe finita in pareggio, ma non il risultato esatto. Ad esempio, se prevedi 2-2 e la partita finisce 1-1, guadagni 15 punti.", fr: "Vous avez correctement predit que le match se terminerait par un nul, mais pas le score exact. Par exemple, si vous predisez 2-2 et le match se termine 1-1, vous gagnez 15 points." },
    winnerAndLoserGoals: { en: "Match Winner & Loser's Goals", pt: "Vencedor e Gols do Perdedor", es: "Ganador y Goles del Perdedor", it: "Vincitore e Gol del Perdente", fr: "Vainqueur et Buts du Perdant" },
    winnerAndLoserGoalsDesc: { en: "You correctly predicted the winner and the number of goals for the losing team. For example, if you predict 3-1 and the match ends 2-1, you earn 12 points.", pt: "Você previu corretamente o vencedor e o número de gols da equipe perdedora. Por exemplo, se você prevê 3-1 e o jogo termina 2-1, você ganha 12 pontos.", es: "Predijiste correctamente al ganador y el numero de goles del equipo perdedor. Por ejemplo, si predices 3-1 y el partido termina 2-1, ganas 12 puntos.", it: "Hai previsto correttamente il vincitore e il numero di gol della squadra perdente. Ad esempio, se prevedi 3-1 e la partita finisce 2-1, guadagni 12 punti.", fr: "Vous avez correctement predit le vainqueur et le nombre de buts de l'equipe perdante. Par exemple, si vous predisez 3-1 et le match se termine 2-1, vous gagnez 12 points." },
    onlyWinner: { en: "Only Match Winner", pt: "Apenas o Vencedor", es: "Solo el Ganador", it: "Solo il Vincitore", fr: "Seulement le Vainqueur" },
    onlyWinnerDesc: { en: "You only correctly predicted the winner of the match. For example, if you predict 2-0 and the match ends 4-1, you earn 10 points.", pt: "Você previu apenas o vencedor da partida. Por exemplo, se você prevê 2-0 e o jogo termina 4-1, você ganha 10 pontos.", es: "Solo predijiste correctamente al ganador del partido. Por ejemplo, si predices 2-0 y el partido termina 4-1, ganas 10 puntos.", it: "Hai previsto solo il vincitore della partita. Ad esempio, se prevedi 2-0 e la partita finisce 4-1, guadagni 10 punti.", fr: "Vous avez seulement predit correctement le vainqueur du match. Par exemple, si vous predisez 2-0 et le match se termine 4-1, vous gagnez 10 points." },
    incorrect: { en: "Incorrect Prediction", pt: "Previsão Incorreta", es: "Prediccion Incorrecta", it: "Previsione Errata", fr: "Prediction Incorrecte" },
    incorrectDesc: { en: "If your prediction doesn't match the outcome, you earn 0 points. For example, if you predict 2-0 but the match ends 0-2, you get no points.", pt: "Se sua previsão não corresponder ao resultado, você ganha 0 pontos. Por exemplo, se você prevê 2-0 mas o jogo termina 0-2, você não ganha pontos.", es: "Si tu prediccion no coincide con el resultado, ganas 0 puntos. Por ejemplo, si predices 2-0 pero el partido termina 0-2, no obtienes puntos.", it: "Se la tua previsione non corrisponde al risultato, guadagni 0 punti. Ad esempio, se prevedi 2-0 ma la partita finisce 0-2, non ottieni punti.", fr: "Si votre prediction ne correspond pas au resultat, vous gagnez 0 point. Par exemple, si vous predisez 2-0 mais le match se termine 0-2, vous n'obtenez aucun point." },
    deadlines: { en: "Prediction Deadlines", pt: "Prazos de Previsão", es: "Plazos de Prediccion", it: "Scadenze delle Previsioni", fr: "Delais de Prediction" },
    deadlinesDesc: { en: "When you can submit or change predictions", pt: "Quando você pode enviar ou alterar previsões", es: "Cuando puedes enviar o cambiar predicciones", it: "Quando puoi inviare o modificare le previsioni", fr: "Quand vous pouvez soumettre ou modifier vos predictions" },
    beforeMatch: { en: "Before Match Starts", pt: "Antes do Jogo Começar", es: "Antes del Inicio del Partido", it: "Prima dell'Inizio della Partita", fr: "Avant le Debut du Match" },
    beforeMatchDesc: { en: "You can submit or update your predictions anytime before the match begins.", pt: "Você pode enviar ou atualizar suas previsões a qualquer momento antes do início do jogo.", es: "Puedes enviar o actualizar tus predicciones en cualquier momento antes del inicio del partido.", it: "Puoi inviare o aggiornare le tue previsioni in qualsiasi momento prima dell'inizio della partita.", fr: "Vous pouvez soumettre ou mettre a jour vos predictions a tout moment avant le debut du match." },
    afterMatchStarts: { en: "After Match Starts", pt: "Após o Início do Jogo", es: "Despues del Inicio del Partido", it: "Dopo l'Inizio della Partita", fr: "Apres le Debut du Match" },
    afterMatchStartsDesc: { en: "Once a match begins, predictions are locked and cannot be changed.", pt: "Depois que o jogo começa, as previsões são bloqueadas e não podem ser alteradas.", es: "Una vez que comienza el partido, las predicciones se bloquean y no pueden cambiarse.", it: "Una volta iniziata la partita, le previsioni sono bloccate e non possono essere modificate.", fr: "Une fois le match commence, les predictions sont verrouillees et ne peuvent plus etre modifiees." },
    afterMatchEnds: { en: "After Match Ends", pt: "Após o Fim do Jogo", es: "Despues del Fin del Partido", it: "Dopo la Fine della Partita", fr: "Apres la Fin du Match" },
    afterMatchEndsDesc: { en: "Points are automatically calculated and added to your total score once the admin updates the final result.", pt: "Os pontos são calculados automaticamente e adicionados ao seu placar total assim que o administrador atualiza o resultado final.", es: "Los puntos se calculan automaticamente y se agregan a tu puntuacion total una vez que el administrador actualiza el resultado final.", it: "I punti vengono calcolati automaticamente e aggiunti al tuo punteggio totale una volta che l'amministratore aggiorna il risultato finale.", fr: "Les points sont automatiquement calcules et ajoutes a votre score total une fois que l'administrateur met a jour le resultat final." },
    examples: { en: "Examples", pt: "Exemplos", es: "Ejemplos", it: "Esempi", fr: "Exemples" },
    examplesDesc: { en: "See how scoring works in practice", pt: "Veja como a pontuação funciona na prática", es: "Mira como funciona la puntuacion en la practica", it: "Scopri come funziona il punteggio in pratica", fr: "Decouvrez comment fonctionne le systeme de points en pratique" },
    matchResult: { en: "Match Result:", pt: "Resultado do Jogo:", es: "Resultado del Partido:", it: "Risultato della Partita:", fr: "Resultat du Match :" },
    yourPrediction: { en: "Your Prediction:", pt: "Sua Previsão:", es: "Tu Prediccion:", it: "La Tua Previsione:", fr: "Votre Prediction :" },
    readyToPredict: { en: "Ready to start predicting?", pt: "Pronto para começar a prever?", es: "Listo para empezar a predecir?", it: "Pronto a iniziare a prevedere?", fr: "Pret a commencer a predire ?" },
    joinNow: { en: "Join Now", pt: "Participar Agora", es: "Unirse Ahora", it: "Unisciti Ora", fr: "Rejoindre Maintenant" },
  },

  // ===== ADMIN =====
  admin: {
    panel: { en: "Admin Panel", pt: "Painel de Administração", es: "Panel de Administracion", it: "Pannello di Amministrazione", fr: "Panneau d'Administration" },
    manageMatches: { en: "Manage matches, update scores, and calculate points", pt: "Gerencie partidas, atualize placares e calcule pontos", es: "Gestiona partidos, actualiza marcadores y calcula puntos", it: "Gestisci partite, aggiorna risultati e calcola punti", fr: "Gerez les matchs, mettez a jour les scores et calculez les points" },
    instructions: { en: "Instructions", pt: "Instruções", es: "Instrucciones", it: "Istruzioni", fr: "Instructions" },
    accessDenied: { en: "Access Denied", pt: "Acesso Negado", es: "Acceso Denegado", it: "Accesso Negato", fr: "Acces Refuse" },
    accessDeniedDesc: { en: "You do not have permission to access the admin panel.", pt: "Você não tem permissão para acessar o painel de administração.", es: "No tienes permiso para acceder al panel de administracion.", it: "Non hai il permesso di accedere al pannello di amministrazione.", fr: "Vous n'avez pas la permission d'acceder au panneau d'administration." },
    accessDeniedInfo: { en: "This area is restricted to administrators only. If you believe you should have access, please contact the system administrator.", pt: "Esta área é restrita apenas a administradores. Se você acredita que deveria ter acesso, entre em contato com o administrador do sistema.", es: "Esta area esta restringida solo a administradores. Si crees que deberias tener acceso, contacta al administrador del sistema.", it: "Quest'area e riservata solo agli amministratori. Se ritieni di dover avere accesso, contatta l'amministratore di sistema.", fr: "Cette zone est reservee aux administrateurs uniquement. Si vous pensez que vous devriez y avoir acces, veuillez contacter l'administrateur du systeme." },
    usersManagement: { en: "Users Management", pt: "Gerenciamento de Usuários", es: "Gestion de Usuarios", it: "Gestione Utenti", fr: "Gestion des Utilisateurs" },
    usersManagementDesc: { en: "Manage all registered users and admin permissions", pt: "Gerencie todos os usuários registrados e permissões de administrador", es: "Gestiona todos los usuarios registrados y permisos de administrador", it: "Gestisci tutti gli utenti registrati e i permessi di amministratore", fr: "Gerez tous les utilisateurs inscrits et les permissions d'administrateur" },
    allUsers: { en: "All Users", pt: "Todos os Usuários", es: "Todos los Usuarios", it: "Tutti gli Utenti", fr: "Tous les Utilisateurs" },
    allUsersDesc: { en: "View and manage user accounts and permissions", pt: "Visualize e gerencie contas de usuários e permissões", es: "Ver y gestionar cuentas de usuarios y permisos", it: "Visualizza e gestisci account utente e permessi", fr: "Voir et gerer les comptes utilisateurs et les permissions" },
    status: { en: "Status", pt: "Status", es: "Estado", it: "Stato", fr: "Statut" },
    joined: { en: "Joined", pt: "Inscrito em", es: "Inscrito", it: "Iscritto", fr: "Inscrit" },
    actions: { en: "Actions", pt: "Ações", es: "Acciones", it: "Azioni", fr: "Actions" },
    noUsers: { en: "No users found", pt: "Nenhum usuário encontrado", es: "No se encontraron usuarios", it: "Nessun utente trovato", fr: "Aucun utilisateur trouve" },
    finished: { en: "Finished", pt: "Finalizado", es: "Finalizado", it: "Terminata", fr: "Termine" },
    pending: { en: "Pending", pt: "Pendente", es: "Pendiente", it: "In attesa", fr: "En attente" },
    delete: { en: "Delete", pt: "Excluir", es: "Eliminar", it: "Elimina", fr: "Supprimer" },
    edit: { en: "Edit", pt: "Editar", es: "Editar", it: "Modifica", fr: "Modifier" },
    cancel: { en: "Cancel", pt: "Cancelar", es: "Cancelar", it: "Annulla", fr: "Annuler" },
    addNewMatch: { en: "Add New Match", pt: "Adicionar Nova Partida", es: "Agregar Nuevo Partido", it: "Aggiungi Nuova Partita", fr: "Ajouter un Nouveau Match" },
    editMatch: { en: "Edit Match", pt: "Editar Partida", es: "Editar Partido", it: "Modifica Partita", fr: "Modifier le Match" },
    matchNumber: { en: "Match Number", pt: "Número da Partida", es: "Numero del Partido", it: "Numero Partita", fr: "Numero du Match" },
    matchDateTime: { en: "Match Date & Time", pt: "Data e Hora da Partida", es: "Fecha y Hora del Partido", it: "Data e Ora della Partita", fr: "Date et Heure du Match" },
    saving: { en: "Saving...", pt: "Salvando...", es: "Guardando...", it: "Salvataggio...", fr: "Enregistrement..." },
    createMatch: { en: "Create Match", pt: "Criar Partida", es: "Crear Partido", it: "Crea Partita", fr: "Creer le Match" },
    updateMatch: { en: "Update Match", pt: "Atualizar Partida", es: "Actualizar Partido", it: "Aggiorna Partita", fr: "Mettre a jour le Match" },
    setFinalScore: { en: "Set Final Score", pt: "Definir Placar Final", es: "Establecer Marcador Final", it: "Imposta Risultato Finale", fr: "Definir le Score Final" },
    updateScore: { en: "Update Score", pt: "Atualizar Placar", es: "Actualizar Marcador", it: "Aggiorna Risultato", fr: "Mettre a jour le Score" },
    updating: { en: "Updating...", pt: "Atualizando...", es: "Actualizando...", it: "Aggiornamento...", fr: "Mise a jour..." },
    scoreSuccess: { en: "Match score updated and points calculated successfully!", pt: "Placar atualizado e pontos calculados com sucesso!", es: "Marcador actualizado y puntos calculados con exito!", it: "Risultato aggiornato e punti calcolati con successo!", fr: "Score mis a jour et points calcules avec succes !" },
    deleteConfirm: { en: "Are you sure?", pt: "Tem certeza?", es: "Estas seguro?", it: "Sei sicuro?", fr: "Etes-vous sur ?" },
    deleteConfirmDesc: { en: "This will permanently delete this match and all associated predictions. This action cannot be undone.", pt: "Isso excluirá permanentemente esta partida e todas as previsões associadas. Esta ação não pode ser desfeita.", es: "Esto eliminara permanentemente este partido y todas las predicciones asociadas. Esta accion no puede deshacerse.", it: "Questo eliminera permanentemente questa partita e tutte le previsioni associate. Questa azione non puo essere annullata.", fr: "Cela supprimera definitivement ce match et toutes les predictions associees. Cette action ne peut pas etre annulee." },
    deleteMatch: { en: "Delete Match", pt: "Excluir Partida", es: "Eliminar Partido", it: "Elimina Partita", fr: "Supprimer le Match" },
    deleting: { en: "Deleting...", pt: "Excluindo...", es: "Eliminando...", it: "Eliminazione...", fr: "Suppression..." },
    noMatches: { en: "No matches available. Click \"Add New Match\" to get started.", pt: "Nenhuma partida disponível. Clique em \"Adicionar Nova Partida\" para começar.", es: "No hay partidos disponibles. Haz clic en \"Agregar Nuevo Partido\" para comenzar.", it: "Nessuna partita disponibile. Clicca su \"Aggiungi Nuova Partita\" per iniziare.", fr: "Aucun match disponible. Cliquez sur \"Ajouter un Nouveau Match\" pour commencer." },
    addMatchesDesc: { en: "Enter the details for the new match.", pt: "Insira os detalhes da nova partida.", es: "Ingresa los detalles del nuevo partido.", it: "Inserisci i dettagli della nuova partita.", fr: "Entrez les details du nouveau match." },
    editMatchDesc: { en: "Update the match details. Note: Scores are updated separately.", pt: "Atualize os detalhes da partida. Nota: Os placares são atualizados separadamente.", es: "Actualiza los detalles del partido. Nota: Los marcadores se actualizan por separado.", it: "Aggiorna i dettagli della partita. Nota: I risultati vengono aggiornati separatamente.", fr: "Mettez a jour les details du match. Remarque : Les scores sont mis a jour separement." },
    instructionAdd: { en: "Click \"Add New Match\" to create a new match with teams and date.", pt: "Clique em \"Adicionar Nova Partida\" para criar uma nova partida com times e data.", es: "Haz clic en \"Agregar Nuevo Partido\" para crear un nuevo partido con equipos y fecha.", it: "Clicca su \"Aggiungi Nuova Partita\" per creare una nuova partita con squadre e data.", fr: "Cliquez sur \"Ajouter un Nouveau Match\" pour creer un match avec les equipes et la date." },
    instructionEdit: { en: "Click \"Edit\" on any match card to update team names, match number, or date.", pt: "Clique em \"Editar\" em qualquer cartão de partida para atualizar nomes, número ou data.", es: "Haz clic en \"Editar\" en cualquier tarjeta para actualizar nombres, numero o fecha.", it: "Clicca su \"Modifica\" su qualsiasi scheda per aggiornare nomi, numero o data.", fr: "Cliquez sur \"Modifier\" sur n'importe quelle carte pour mettre a jour les noms, le numero ou la date." },
    instructionScore: { en: "Enter final scores and click \"Set Final Score\" to calculate points automatically.", pt: "Insira os placares finais e clique em \"Definir Placar Final\" para calcular os pontos automaticamente.", es: "Ingresa los marcadores finales y haz clic en \"Establecer Marcador Final\" para calcular los puntos automaticamente.", it: "Inserisci i risultati finali e clicca su \"Imposta Risultato Finale\" per calcolare i punti automaticamente.", fr: "Entrez les scores finaux et cliquez sur \"Definir le Score Final\" pour calculer les points automatiquement." },
    instructionDelete: { en: "Click \"Delete\" to remove a match and all its predictions permanently.", pt: "Clique em \"Excluir\" para remover uma partida e todas as suas previsões permanentemente.", es: "Haz clic en \"Eliminar\" para eliminar un partido y todas sus predicciones permanentemente.", it: "Clicca su \"Elimina\" per rimuovere una partita e tutte le sue previsioni permanentemente.", fr: "Cliquez sur \"Supprimer\" pour supprimer un match et toutes ses predictions definitivement." },
  },
} as const

export type TranslationKey = keyof typeof translations
export type TranslationSection = typeof translations

export function t(section: string, key: string, locale: Locale): string {
  const parts = section.split(".")
  let obj: Record<string, unknown> = translations as Record<string, unknown>
  for (const part of parts) {
    obj = obj[part] as Record<string, unknown>
    if (!obj) return key
  }
  const entry = obj[key] as Record<string, string> | undefined
  if (!entry) return key
  return entry[locale] || entry.en || key
}

export default translations
