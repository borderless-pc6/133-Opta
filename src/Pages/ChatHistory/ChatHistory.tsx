import React, { useState } from 'react';
import './ChatHistory.css';
import { Download, Copy, Filter, RefreshCw, MessageSquare, Share2, UserCheck, MoreHorizontal } from 'lucide-react';

interface ServiceReportProps {
    username: string;
    onLogout: () => void;
    onNavigateToChat: () => void;
    onHomePage: () => void;
}

const ChatHistory: React.FC<ServiceReportProps> = ({ onLogout, onNavigateToChat, onHomePage }) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const toggleSelectRow = (id: number) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === serviceData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(serviceData.map(item => item.id));
        }
    };

    const serviceData = [
        {
            id: 33991,
            client: {
                name: '555499537313',
                phone: '555499537313',
                avatar: 'G',
                color: '#4caf50'
            },
            outcome: 'Não especificado',
            icon: null,
            duration: '00:01:26',
            status: 'CLOSED',
            date: '5/21/2025, 9:18 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33992,
            client: {
                name: 'Fabio Torres',
                phone: '555499709781',
                avatar: 'F',
                color: '#4caf50'
            },
            outcome: '',
            icon: 'chat',
            duration: '05:48:18',
            status: 'OPEN',
            date: '5/21/2025, 9:24 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33993,
            client: {
                name: 'SERGIO TUSCHUSTER',
                phone: '555498179436',
                avatar: 'S',
                color: '#4caf50'
            },
            outcome: '',
            icon: 'file',
            duration: '05:45:26',
            status: 'OPEN',
            date: '5/21/2025, 9:27 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33994,
            client: {
                name: '555481485113',
                phone: '555481485113',
                avatar: 'G',
                color: '#4caf50'
            },
            outcome: '',
            icon: 'package',
            duration: '05:44:28',
            status: 'OPEN',
            date: '5/21/2025, 9:28 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33995,
            client: {
                name: 'VALDIR DOS SANTOS P...',
                phone: '555499631987',
                avatar: 'V',
                color: '#4caf50'
            },
            outcome: '',
            icon: 'file',
            duration: '05:42:05',
            status: 'OPEN',
            date: '5/21/2025, 9:31 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33996,
            client: {
                name: 'Marina 846',
                phone: '555498183238',
                avatar: 'M',
                color: '#4caf50'
            },
            outcome: 'Não especificado',
            icon: null,
            duration: '00:09:22',
            status: 'CLOSED',
            date: '5/21/2025, 9:34 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33997,
            client: {
                name: 'Gabriel 846',
                phone: '555499625261',
                avatar: 'G',
                color: '#4caf50'
            },
            outcome: 'Não especificado',
            icon: null,
            duration: '00:08:46',
            status: 'CLOSED',
            date: '5/21/2025, 9:35 AM',
            count: 0,
            transferred: 'No'
        },
        {
            id: 33998,
            client: {
                name: 'SERGIO SERBE',
                phone: '555498229056',
                avatar: 'S',
                color: '#4caf50'
            },
            outcome: '',
            icon: 'file',
            duration: '05:37:26',
            status: 'OPEN',
            date: '5/21/2025, 9:35 AM',
            count: 0,
            transferred: 'No'
        }
    ];

    const renderIcon = (icon: string | null) => {
        if (!icon) return null;

        switch (icon) {
            case 'file':
                return <div className="icon-file"></div>;
            case 'chat':
                return <div className="icon-chat"></div>;
            case 'package':
                return <div className="icon-package"></div>;
            default:
                return null;
        }
    };

    return (
        <div className="service-report">
            <header className="home-header">
                <div className="header-content">
                    <h1>OPTA</h1>

                    <div className="s-header-content">
                        <button
                            className="section-button tooltip"
                            onClick={onHomePage}
                            data-tooltip="Home"
                            aria-label="Home"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>

                        <button
                            className="section-button tooltip"
                            onClick={onNavigateToChat}
                            data-tooltip="Chat"
                            aria-label="Chat"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </button>

                        <button
                            className="section-button tooltip active-button"
                            data-tooltip="Relatórios"
                            aria-label="Relatórios"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="3" x2="9" y2="21"></line>
                                <path d="M13 8h5"></path>
                                <path d="M13 12h5"></path>
                                <path d="M13 16h5"></path>
                                <path d="M5 8h2"></path>
                                <path d="M5 12h2"></path>
                                <path d="M5 16h2"></path>
                            </svg>
                        </button>

                        <button
                            className="section-button tooltip"
                            onClick={onLogout}
                            data-tooltip="Sair"
                            aria-label="Sair"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.36 6.64C19.6184 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3096 16.4478C19.6284 18.0921 18.4748 19.4976 16.9948 20.4864C15.5148 21.4752 13.7749 22.0029 11.995 22.0029C10.2151 22.0029 8.47515 21.4752 6.99517 20.4864C5.51519 19.4976 4.36164 18.0921 3.68036 16.4478C2.99909 14.8034 2.82069 12.9939 3.16772 11.2482C3.51475 9.50244 4.37162 7.89879 5.63 6.64"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M12 2V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <div className="service-report-content">
                <h1>Historico de Chat</h1>

                <div className="filters-container">
                    <div className="input-group">
                        <input type="text" placeholder="Number" />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder="Protocol" />
                    </div>
                    <div className="input-group dropdown">
                        <div className="dropdown-value">Queue</div>
                        <div className="dropdown-arrow">▼</div>
                    </div>
                    <div className="input-group dropdown">
                        <div className="dropdown-value">Type</div>
                        <div className="dropdown-text">All</div>
                        <div className="dropdown-arrow">▼</div>
                    </div>
                    <div className="input-group dropdown">
                        <div className="dropdown-value">Period</div>
                        <div className="dropdown-text">Today</div>
                        <div className="dropdown-arrow">▼</div>
                    </div>

                    <div className="actions-container">
                        <button className="download-button">
                            <Download size={16} />
                        </button>
                        <button className="update-button">
                            <RefreshCw size={16} />
                            <span>Update</span>
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    <div className="table-actions">
                        <button className="copy-button">
                            <Copy size={16} />
                        </button>
                        <button className="export-button">
                            <Download size={16} />
                        </button>
                    </div>

                    <table className="service-table">
                        <thead>
                            <tr>
                                <th className="checkbox-column">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === serviceData.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="id-column">
                                    ID
                                    <span className="sort-icon">↕</span>
                                </th>
                                <th className="client-column">
                                    Client
                                    <span className="sort-icon">↕</span>
                                </th>
                                <th className="outcome-column">
                                    <div className="column-with-icon">
                                        <span className="icon-placeholder"></span>
                                        <span>Outcome</span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="duration-column">
                                    <div className="column-with-icon">
                                        <span>Duration</span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="status-column">
                                    <div className="column-with-icon">
                                        <span>Status</span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="date-column">
                                    <div className="column-with-icon">
                                        <span>Date</span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="count-column">
                                    <div className="column-with-icon">
                                        <span className="icon-placeholder"></span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="transferred-column">
                                    <div className="column-with-icon">
                                        <span className="icon-placeholder"></span>
                                        <span className="sort-icon">↕</span>
                                    </div>
                                </th>
                                <th className="functions-column">Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceData.map((item) => (
                                <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected' : ''}>
                                    <td className="checkbox-column">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => toggleSelectRow(item.id)}
                                        />
                                    </td>
                                    <td className="id-column">{item.id}</td>
                                    <td className="client-column">
                                        <div className="client-info">
                                            <div className="client-avatar" style={{ backgroundColor: item.client.color }}>
                                                {item.client.avatar}
                                            </div>
                                            <div className="client-details">
                                                <div className="client-name">{item.client.name}</div>
                                                <div className="client-phone">{item.client.phone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="outcome-column">
                                        {item.outcome || (
                                            <div className="outcome-icon">
                                                {renderIcon(item.icon)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="duration-column">{item.duration}</td>
                                    <td className="status-column">
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="date-column">{item.date}</td>
                                    <td className="count-column">{item.count}</td>
                                    <td className="transferred-column">{item.transferred}</td>
                                    <td className="functions-column">
                                        <div className="function-buttons">
                                            <button className="function-button">
                                                <MessageSquare size={16} />
                                            </button>
                                            <button className="function-button">
                                                <Share2 size={16} />
                                            </button>
                                            <button className="function-button">
                                                <UserCheck size={16} />
                                            </button>
                                            <button className="function-button">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="table-footer">
                        <div className="filter-creator">
                            <Filter size={16} />
                            <span>Create Filter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHistory;