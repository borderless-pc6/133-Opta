import { NextResponse } from "next/server"

// Lista de categorias de tickets (em produção, busque de um banco de dados)
const categories = ["Suporte Técnico", "Financeiro", "Dúvidas", "Reclamações", "Sugestões", "Outros"]

export async function GET() {
    return NextResponse.json(categories)
}
