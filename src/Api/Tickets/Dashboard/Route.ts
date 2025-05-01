import { NextResponse } from "next/server"

// Simulação de um banco de dados (em produção, use um banco de dados real)
// Esta é apenas uma referência - os tickets são armazenados no arquivo route.ts principal
const tickets: any[] = []

export async function GET() {
    try {
        // Estatísticas para o dashboard
        const totalTickets = tickets.length
        const openTickets = tickets.filter((t) => t.status === "aberto").length
        const inProgressTickets = tickets.filter((t) => t.status === "em_andamento").length
        const resolvedTickets = tickets.filter((t) => t.status === "resolvido").length
        const closedTickets = tickets.filter((t) => t.status === "fechado").length

        // Tickets por categoria
        const categoryCounts: Record<string, number> = {}
        tickets.forEach((ticket) => {
            if (categoryCounts[ticket.category]) {
                categoryCounts[ticket.category]++
            } else {
                categoryCounts[ticket.category] = 1
            }
        })

        // Tickets por prioridade
        const priorityCounts = {
            baixa: tickets.filter((t) => t.priority === "baixa").length,
            média: tickets.filter((t) => t.priority === "média").length,
            alta: tickets.filter((t) => t.priority === "alta").length,
        }

        // Tickets recentes (últimos 5)
        const recentTickets = [...tickets]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)

        return NextResponse.json({
            counts: {
                total: totalTickets,
                open: openTickets,
                inProgress: inProgressTickets,
                resolved: resolvedTickets,
                closed: closedTickets,
            },
            byCategory: categoryCounts,
            byPriority: priorityCounts,
            recentTickets,
        })
    } catch (error) {
        console.error("Erro ao gerar estatísticas:", error)
        return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
    }
}
