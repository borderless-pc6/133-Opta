import React, { useState } from 'react';
import './AgentsDashboard.css';
import {
    Clock,
    Filter,
    Search,
    MoreVertical,
    Info,
    Lock,
    Columns,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

interface AgentsDashboardProps {
    username: string;
    onHomePage: () => void;
    onLogout: () => void;
    onNavigateToChat: () => void;
}

const AgentsDashboard: React.FC<AgentsDashboardProps> = ({
    onHomePage
}) => {
    const [activeTab, setActiveTab] = useState<'agent' | 'service'>('agent');

    const agents = [
        { id: 1, initials: 'AN', name: 'Alexandre N.', queues: 4, chats: 2, chatCount: 0, chatLabel: 'N/A', waitTime: '0.0', responseTime: '0.0', loggedIn: '06:01:09', pauseTime: '00:00:00', isAvailable: true },
        { id: 2, initials: 'CA', name: 'Carolina F.', queues: 2, chats: 379, chatCount: 1, chatLabel: 'chat', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:43:35', pauseTime: '00:00:00', isAvailable: true },
        { id: 3, initials: 'EM', name: 'Eduardo S.', queues: 2, chats: 384, chatCount: 0, chatLabel: 'N/A', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:31:29', pauseTime: '00:00:00', isAvailable: true },
        { id: 4, initials: 'LE', name: 'Leonardo N.', queues: 2, chats: 423, chatCount: 2, chatLabel: 'chats', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:38:07', pauseTime: '00:00:00', isAvailable: true },
        { id: 5, initials: 'MA', name: 'Marcela M.', queues: 2, chats: 518, chatCount: 0, chatLabel: 'N/A', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:42:30', pauseTime: '00:00:00', isAvailable: true },
        { id: 6, initials: 'RA', name: 'Renata A.', queues: 2, chats: 52, chatCount: 229, chatLabel: 'chats', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:43:33', pauseTime: '00:00:00', isAvailable: true },
        { id: 7, initials: 'TI', name: 'Thiago C.', queues: 2, chats: 81, chatCount: 7, chatLabel: 'chats', waitTime: '0.0', responseTime: '0.0', loggedIn: '05:43:44', pauseTime: '00:00:00', isAvailable: true }
    ];

    const sidebarAgents = [
        { id: 1, name: 'Suporte T.I.', count: 0, online: true },
        { id: 2, name: 'Teste 11', count: 0, online: true },
        { id: 3, name: 'IAPC - Bruno O.', count: 0, online: true },
        { id: 4, name: 'IAPC - Leonardo N.', count: 0, online: true },
        { id: 5, name: 'IAPC - Carolina F.', count: 0, online: true },
        { id: 6, name: 'IAPC - Eduardo S.', count: 0, online: true },
        { id: 7, name: 'CONSIG - Bruna F.', count: 0, online: true },
        { id: 8, name: 'IAPC - Marcela M.', count: 0, online: true },
        { id: 9, name: 'LIVRE', count: 0, online: true }
    ];

    const statusCounts = {
        critical: 0,
        warning: 0,
        success: 7,
        pending: 0
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="filter-container">
                    <div className="filter-header">
                        <Filter size={18} />
                        <span>Filter</span>
                        <button className="clear-button">×</button>
                    </div>

                    {sidebarAgents.map(agent => (
                        <div key={agent.id} className="sidebar-agent">
                            <div className="agent-status">
                                <span className="status-dot online"></span>
                                <span>{agent.name}</span>
                            </div>
                            <div className="agent-count">
                                <span>{agent.count}</span>
                                <span className="dropdown-arrow">▼</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <button className="back-button" onClick={onHomePage}>
                        ← Voltar para Home
                    </button>
                </div>

                <div className="tabs">
                    <button className={`tab ${activeTab === 'agent' ? 'active' : ''}`} onClick={() => setActiveTab('agent')}>
                        Agent dashboard
                    </button>
                    <button className={`tab ${activeTab === 'service' ? 'active' : ''}`} onClick={() => setActiveTab('service')}>
                        Service dashboard
                    </button>
                </div>

                <div className="dashboard-header">
                    <div className="status-counts">
                        <div className="status-item critical"><XCircle size={16} /><span>{statusCounts.critical}</span></div>
                        <div className="status-item warning"><AlertCircle size={16} /><span>{statusCounts.warning}</span></div>
                        <div className="status-item success"><CheckCircle size={16} /><span>{statusCounts.success}</span></div>
                        <div className="status-item pending"><Clock size={16} /><span>{statusCounts.pending}</span></div>
                    </div>

                    <div className="filter-search">
                        <div className="filter-dropdown"><span>Filter</span><span>Agents</span><span className="dropdown-arrow">▼</span></div>
                        <div className="search-box"><input type="text" placeholder="Search" /><Search size={16} /></div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="time-tabs">
                        <div className="time-tab">Now</div>
                        <div className="time-tab">Today</div>
                    </div>

                    <div className="table-header">
                        <div className="header-cell agent-col"><span>Agent</span><span className="sort-arrow">↑</span></div>
                        <div className="header-cell status-col">Status</div>
                        <div className="header-cell queues-col"><div className="col-content"><Clock size={16} /></div></div>
                        <div className="header-cell chats-col"><div className="col-content"><span className="icon-placeholder"></span></div></div>
                        <div className="header-cell chat-count-col"><div className="col-content"><span className="icon-placeholder"></span></div></div>
                        <div className="header-cell wait-time-col"><div className="col-content"><Clock size={16} /><span>0.0</span></div></div>
                        <div className="header-cell response-time-col"><div className="col-content"><Clock size={16} /><span>0.0</span></div></div>
                        <div className="header-cell logged-in-col"><div className="col-content">Logged in</div></div>
                        <div className="header-cell pause-col"><div className="col-content">Pause</div></div>
                        <div className="header-cell functions-col"><div className="col-content">Functions</div></div>
                    </div>

                    <div className="table-body">
                        {agents.map(agent => (
                            <div key={agent.id} className="table-row">
                                <div className="cell agent-col">
                                    <div className="agent-avatar"><span>{agent.initials}</span></div>
                                    <div className="agent-name">{agent.name}</div>
                                </div>
                                <div className="cell status-col">
                                    <div className={`status-indicator ${agent.isAvailable ? 'available' : 'unavailable'}`}>
                                        <div className="status-circle"></div>
                                    </div>
                                </div>
                                <div className="cell queues-col"><div className="queues-count">{agent.queues}</div><div className="queues-label">Queues</div></div>
                                <div className="cell chats-col"><div className="chats-count">{agent.chats}</div><div className="chats-label">chats</div></div>
                                <div className="cell chat-count-col"><div className="chat-count">{agent.chatCount}</div><div className="chat-label">{agent.chatLabel}</div></div>
                                <div className="cell wait-time-col"><div className="time-value">{agent.waitTime}</div></div>
                                <div className="cell response-time-col"><div className="time-value">{agent.responseTime}</div></div>
                                <div className="cell logged-in-col"><div className="time-value">{agent.loggedIn}</div></div>
                                <div className="cell pause-col"><div className="time-value">{agent.pauseTime}</div></div>
                                <div className="cell functions-col">
                                    <div className="function-icons">
                                        <Lock size={16} />
                                        <Columns size={16} />
                                        <Info size={16} />
                                        <MoreVertical size={16} className="more-icon" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentsDashboard;
