"use client"

import React, { useState, useEffect } from "react"
import "./ClienteApi.css"

interface ClienteApiProps {
    username: string
    onHomePage: () => void
    onLogout: () => void
}

interface QueueItem {
    id: string
    name: string
    status: "waiting" | "in-progress" | "completed"
    createdAt: number
}

const ClienteApi: React.FC<ClienteApiProps> = ({ username, onHomePage, onLogout }) => {
    const [formData, setFormData] = useState({
        name: username,
        email: "",
        subject: "",
        message: "",
        priority: "medium"
    })

    const [filasDisponiveis, setFilasDisponiveis] = useState<string[]>([])
    const [filaSelecionada, setFilaSelecionada] = useState<string>("")

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Carregar filas do localStorage
    useEffect(() => {
        const saved = localStorage.getItem("filasGlobais")
        if (saved) {
            const parsed = JSON.parse(saved)
            const filaKeys = Object.keys(parsed)
            setFilasDisponiveis(filaKeys)
            if (filaKeys.length > 0) setFilaSelecionada(filaKeys[0])
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilaSelecionada(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!filaSelecionada) return alert("Selecione uma fila para continuar.")

        setSubmitting(true)

        setTimeout(() => {
            // Adicionar novo item à fila selecionada
            const saved = localStorage.getItem("filasGlobais")
            const filas = saved ? JSON.parse(saved) : {}

            const filaAtual = filas[filaSelecionada] || []
            const nextId = filaAtual.length > 0
                ? (Math.max(...filaAtual.map((item: QueueItem) => parseInt(item.id))) + 1).toString()
                : "0"

            const novoItem: QueueItem = {
                id: nextId,
                name: formData.name,
                status: "waiting",
                createdAt: Date.now()
            }

            filas[filaSelecionada] = [...filaAtual, novoItem]
            localStorage.setItem("filasGlobais", JSON.stringify(filas))

            console.log("Form submitted:", formData)
            setSubmitting(false)
            setSubmitted(true)

            setFormData({
                name: username,
                email: "",
                subject: "",
                message: "",
                priority: "medium"
            })

            setTimeout(() => {
                setSubmitted(false)
            }, 3000)
        }, 1000)
    }

    return (
        <div className="cliente-api-container">
            <header className="cliente-api-header">
                <div className="header-content">
                    <h1>OPTA - Suporte</h1>
                    <div className="header-buttons">
                        <button className="header-button" onClick={onHomePage}>Inicio</button>
                        <button className="header-button" onClick={onLogout}>Sair</button>
                    </div>
                </div>
            </header>

            <main className="cliente-api-content">
                <div className="support-form-container">
                    <h2>Formulário de Suporte</h2>

                    {submitted ? (
                        <div className="success-message">
                            <p>Seu ticket de suporte foi enviado com sucesso!</p>
                            <p>Nossa equipe entrará em contato o mais breve possível.</p>
                        </div>
                    ) : (
                        <form className="support-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nome:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Assunto:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Descreva brevemente o assunto"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Prioridade:</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="low">Baixa</option>
                                    <option value="medium">Média</option>
                                    <option value="high">Alta</option>
                                    <option value="critical">Crítica</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensagem:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Descreva detalhadamente o seu problema ou solicitação"
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fila">Selecionar Fila:</label>
                                <select
                                    id="fila"
                                    name="fila"
                                    value={filaSelecionada}
                                    onChange={handleFilaChange}
                                    required
                                >
                                    {filasDisponiveis.length === 0 ? (
                                        <option value="">Nenhuma fila disponível</option>
                                    ) : (
                                        filasDisponiveis.map((fila) => (
                                            <option key={fila} value={fila}>{fila}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="form-submit">
                                <button type="submit" className="submit-button" disabled={submitting}>
                                    {submitting ? "Enviando..." : "Enviar Ticket"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            <footer className="cliente-api-footer">
                <p>OPTA © {new Date().getFullYear()} - Todos os direitos reservados</p>
            </footer>
        </div>
    )
}

export default ClienteApi
