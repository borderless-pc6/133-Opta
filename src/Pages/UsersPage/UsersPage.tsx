"use client";
import type React from "react";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Filter,
  MoreVertical,
  Home,
  LogOut,
  User,
} from "lucide-react";
import CreateUsers from "../RegisterPage/CreateUsers";
import "./UsersPage.css";

interface UsersPageProps {
  username: string;
  onHomePage: () => void;
  onLogout: () => void;
  onCreateUser: () => void;
}

const usuariosIniciais = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@exemplo.com",
    cargo: "Gerente de Projetos",
    departamento: "TI",
    status: "Ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@exemplo.com",
    cargo: "Desenvolvedor Frontend",
    departamento: "Desenvolvimento",
    status: "Ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nome: "Mariana Costa",
    email: "mariana.costa@exemplo.com",
    cargo: "Designer UX",
    departamento: "Design",
    status: "Inativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    nome: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    cargo: "Analista de Dados",
    departamento: "Análise",
    status: "Ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    nome: "Juliana Pereira",
    email: "juliana.pereira@exemplo.com",
    cargo: "Gerente de Marketing",
    departamento: "Marketing",
    status: "Ativo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const UsersPage: React.FC<UsersPageProps> = ({
  username,
  onHomePage,
  onLogout,
}) => {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [termoBusca, setTermoBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [notificacao, setNotificacao] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUsuarioCriado = (novoUsuario: any) => {
    setUsuarios((prev) => [...prev, { ...novoUsuario, id: prev.length + 1 }]);
    setMostrarFormulario(false);
    setNotificacao("Usuário criado com sucesso!");

    setTimeout(() => {
      setNotificacao("");
    }, 3000);
  };

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      usuario.departamento.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="users-page-container">
      {notificacao && <div className="notificacao-sucesso">{notificacao}</div>}

      <div className="page-header">
        <div className="header-actions">
          <button className="button outline-button" onClick={onHomePage}>
            <Home className="icon" />
            Página Inicial
          </button>
        </div>
        <div className="user-profile">
          <div className="user-welcome">
            <User className="icon" />
            <span>
              Bem-vindo(a), <strong>{username}</strong>
            </span>
          </div>
          <button className="button danger-button" onClick={onLogout}>
            <LogOut className="icon" />
            Sair
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Usuários</h2>
            <p className="card-description">
              Gerencie os usuários do seu sistema.
            </p>
          </div>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="button primary-button add-user-button"
          >
            <UserPlus className="icon" />
            Adicionar Usuário
          </button>
        </div>
        <div className="card-content">
          <div className="search-filter-container">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="button outline-button filter-button">
              <Filter className="icon" />
              Filtros
            </button>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Cargo</th>
                  <th>Departamento</th>
                  <th>Status</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>
                        <div className="user-info">
                          <div className="avatar">
                            <img
                              src={usuario.avatar || "/placeholder.svg"}
                              alt={usuario.nome}
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  usuario.nome
                                )}&background=random`;
                              }}
                            />
                          </div>
                          <div>
                            <div className="user-name">{usuario.nome}</div>
                            <div className="user-email">{usuario.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{usuario.cargo}</td>
                      <td>{usuario.departamento}</td>
                      <td>
                        <span
                          className={`status-badge ${usuario.status.toLowerCase()}`}
                        >
                          {usuario.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button className="icon-button">
                          <MoreVertical className="icon" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateUsers
              onClose={() => setMostrarFormulario(false)}
              onUserCreated={handleUsuarioCriado}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
