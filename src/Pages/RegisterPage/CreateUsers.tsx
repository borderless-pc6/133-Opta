import "./CreateUsers.css";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

// Estilos inline para a notificação
const notificationStyles = {
  container: {
    position: "fixed" as const,
    top: "20px",
    right: "20px",
    minWidth: "300px",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  success: {
    backgroundColor: "#e6f7e6",
    borderLeft: "4px solid #28a745",
    color: "#0f5132",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderLeft: "4px solid #dc3545",
    color: "#842029",
  },
  message: {
    margin: "0 0 0 12px",
    flexGrow: 1,
  },
  icon: {
    fontSize: "20px",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    opacity: 0.7,
    padding: 0,
    marginLeft: "8px",
  },
};

interface CreateUsersProps {
  onClose: () => void;
  onUserCreated: (usuario: {
    nome: string;
    email: string;
    cargo: string;
    departamento: string;
    status: string;
    avatar?: string;
  }) => void;
}

// Componente de Notificação Interno
function InlineNotification({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      style={{ ...notificationStyles.container, ...notificationStyles[type] }}
    >
      <span style={notificationStyles.icon}>
        {type === "success" ? "✓" : "✗"}
      </span>
      <p style={notificationStyles.message}>{message}</p>
      <button style={notificationStyles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
}

function CreateUsers({ onClose, onUserCreated }: CreateUsersProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({
      show: true,
      message,
      type,
    });

    if (type === "success") {
      setTimeout(() => {
        hideNotification();
        setTimeout(() => {
          onClose();
        }, 300);
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showNotification("As senhas não coincidem.", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        nome: formData.username,
        email: formData.email,
        funcao: formData.role,
      });

      onUserCreated({
        nome: formData.username,
        email: formData.email,
        cargo: formData.role,
        departamento: "Não definido",
        status: "Ativo",
        avatar: "/placeholder.svg",
      });

      showNotification("Usuário criado com sucesso!", "success");
    } catch (error: unknown) {
      console.error("Erro ao criar usuário:", error);
      if (error instanceof Error) {
        showNotification(`Erro ao criar usuário: ${error.message}`, "error");
      } else {
        showNotification("Erro ao criar usuário: erro desconhecido.", "error");
      }
    }
  };

  return (
    <div className="create-user-container">
      {notification && notification.show && (
        <InlineNotification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      <h2>Criar Novo Usuário</h2>

      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-group">
          <label className="form-group-label" htmlFor="username">
            Nome de Usuário
          </label>
          <input
            className="form-group-input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Função</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-create">
            Criar Usuário
          </button>
          <button type="button" className="btn-back" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUsers;
