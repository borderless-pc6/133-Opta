import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Definição do schema para validação dos tickets
const ticketSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    priority: z.enum(["baixa", "média", "alta"]),
    category: z.string(),
    requesterName: z.string(),
    requesterEmail: z.string().email("Email inválido"),
    status: z.enum(["aberto", "em_andamento", "resolvido", "fechado"]).default("aberto"),
})

// Tipo do ticket baseado no schema
type Ticket = z.infer<typeof ticketSchema>

// Simulação de um banco de dados (em produção, use um banco de dados real)
const tickets: (Ticket & { id: string; createdAt: Date })[] = []

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validação dos dados recebidos
        const result = ticketSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: "Dados inválidos", details: result.error.format() }, { status: 400 })
        }

        // Criação do ticket
        const newTicket = {
            ...result.data,
            id: crypto.randomUUID(),
            createdAt: new Date(),
        }

        // Adiciona o ticket à lista (em produção, salve no banco de dados)
        tickets.push(newTicket)

        return NextResponse.json(newTicket, { status: 201 })
    } catch (error) {
        console.error("Erro ao criar ticket:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        // Parâmetros de consulta para filtragem
        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")
        const category = searchParams.get("category")

        // Filtragem dos tickets
        let filteredTickets = [...tickets]

        if (status) {
            filteredTickets = filteredTickets.filter((ticket) => ticket.status === status)
        }

        if (category) {
            filteredTickets = filteredTickets.filter((ticket) => ticket.category === category)
        }

        return NextResponse.json(filteredTickets)
    } catch (error) {
        console.error("Erro ao listar tickets:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}
