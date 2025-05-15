import "./CreateUsers.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

function CreateUsers() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Salvar dados no Firestore
            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                nome: formData.username,
                email: formData.email,
                funcao: formData.role
            });

            alert("Usuário criado com sucesso!");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error);
            alert(`Erro ao criar usuário: ${error.message}`);
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className="create-user-container">
            <h2>Criar Novo Usuário</h2>

            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group">
                    <label className="form-group-label" htmlFor="username">Nome de Usuário</label>
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
                    >
                        <option value="master">Super-Administrador</option>
                        <option value="admin">Administrador</option>
                        <option value="operator">Operador</option>
                        <option value="user">Consultor-Externo</option>
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-create">Criar Usuário</button>
                    <button type="button" className="btn-back" onClick={handleBack}>
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateUsers;
