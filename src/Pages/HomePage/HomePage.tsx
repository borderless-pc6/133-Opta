"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import "./HomePage.css"
import FilaPage from "../FilaPage/FilaPage"
import ClienteApi from "../ClienteApi/ClienteApi"
import UsersPage from "../UsersPage/UsersPage"
import ChatPage from "../ChatPage/ChatPage"
import AgentsDashboard from "../AgentsDashboard/AgentsDashboard"
import ChatHistory from "../ChatHistory/ChatHistory"

interface HomePageProps {
  username: string
  onLogout: () => void
  onNavigateToChat: () => void
}

const HomePage: React.FC<HomePageProps> = ({ username, onLogout }) => {
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [showFilaPage, setShowFilaPage] = useState(false)
  const [showClienteApi, setShowClienteApi] = useState(false)
  const [showSettingsPopout, setShowSettingsPopout] = useState(false)
  const [showUsersPage, setShowUsersPage] = useState(false)
  const [showChatPage, setShowChatPage] = useState(false)
  const [showAgentsDashboard, setShowAgentsDashboard] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)

  const settingsRef = useRef<HTMLDivElement>(null)

  const handleFilaPage = () => {
    setShowFilaPage(true)
    setShowClienteApi(false)
    setShowUsersPage(false)
    setShowChatPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(false)
  }

  const handleHomePage = () => {
    setShowFilaPage(false)
    setShowClienteApi(false)
    setShowUsersPage(false)
    setShowChatPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(false)
  }

  const handleClienteApi = () => {
    setShowClienteApi(true)
    setShowFilaPage(false)
    setShowUsersPage(false)
    setShowChatPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(false)
  }

  const handleUsersPage = () => {
    setShowUsersPage(true)
    setShowFilaPage(false)
    setShowClienteApi(false)
    setShowChatPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(false)
  }

  const handleChatPage = () => {
    setShowChatPage(true)
    setShowFilaPage(false)
    setShowClienteApi(false)
    setShowUsersPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(false)
  }

  const handleAgentsDashboard = () => {
    setShowFilaPage(false)
    setShowClienteApi(false)
    setShowUsersPage(false)
    setShowChatPage(false)
    setShowAgentsDashboard(true)
    setShowChatHistory(false)
  }

  const handleChatHistory = () => {
    setShowFilaPage(false)
    setShowClienteApi(false)
    setShowUsersPage(false)
    setShowChatPage(false)
    setShowAgentsDashboard(false)
    setShowChatHistory(true)
  }

  const handleSettingsPopout = () => {
    setShowSettingsPopout((prevState) => !prevState)
  }

  // Close settings popout when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsPopout(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Conditional rendering for pages
  if (showFilaPage) {
    return <FilaPage username={username} onHomePage={handleHomePage} onLogout={onLogout} />
  }

  if (showClienteApi) {
    return <ClienteApi username={username} onHomePage={handleHomePage} onLogout={onLogout} />
  }

  if (showUsersPage) {
    return (
      <UsersPage
        username={username}
        onHomePage={handleHomePage}
        onLogout={onLogout}
        onCreateUser={(): void => {
          throw new Error("Function not implemented.")
        }}
      />
    )
  }

  if (showChatPage) {
    return (
      <ChatPage
        username={username}
        onHomePage={handleHomePage}
        onLogout={onLogout}
        onNavigateToChat={(): void => {
          throw new Error("Function not implemented.")
        }}
      />
    )
  }

  if (showAgentsDashboard) {
    return (
      <AgentsDashboard
        username={username}
        onLogout={onLogout}
        onNavigateToChat={() => { }}
        onHomePage={handleHomePage}
      />
    )
  }

  if (showChatHistory) {
    return (
      <ChatHistory
        username={username}
        onLogout={onLogout}
        onNavigateToChat={() => { }}
        onHomePage={handleHomePage}
      />
    )
  }


  const handleButtonClick = (index: number) => {
    setActiveButton(index)
    switch (index) {
      case 0:
        handleFilaPage()
        break
      case 1:
        handleUsersPage()
        break
      case 4:
        handleClienteApi()
        break
      case 5:
        handleChatPage()
        break
      case 7:
        handleSettingsPopout()
        break
      case 8:
        handleAgentsDashboard()
        break
      case 9:
        handleChatHistory()
        break
      default:
        handleHomePage()
        break
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>OPTA</h1>

          <div className="s-header-content">
            <button
              className={`section-button tooltip ${activeButton === 0 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(0)}
              data-tooltip="Fila"
              aria-label="Fila"
            >
              {/* Ícone Lista */}
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
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="3" cy="6" r="1" />
                <circle cx="3" cy="12" r="1" />
                <circle cx="3" cy="18" r="1" />
              </svg>
            </button>

            <button
              className={`section-button tooltip ${activeButton === 4 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(4)}
              data-tooltip="Suporte"
              aria-label="Suporte"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className={`section-button tooltip ${activeButton === 1 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(1)}
              data-tooltip="Usuarios"
              aria-label="Usuarios"
            >
              {/* Ícone Usuários */}
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
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            </button>

            <button
              className={`section-button tooltip ${activeButton === 5 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(5)}
              data-tooltip="Chat"
              aria-label="Chat"
            >
              {/* Ícone Chat */}
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
              className={`section-button tooltip ${activeButton === 7 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(8)}
              data-tooltip="Configurações"
              aria-label="Configurações"
            >
              {/* Ícone Configurações */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className={`section-button tooltip ${activeButton === 9 ? "active-button" : ""}`}
              onClick={() => handleButtonClick(9)}
              data-tooltip="Relatórios"
              aria-label="Relatórios"
            >
              {/* Ícone Relatórios */}
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
              className={`section-button tooltip ${activeButton === 8 ? "active-button" : ""}`}
              onClick={onLogout}
              data-tooltip="Sair"
              aria-label="Sair"
            >
              {/* Ícone Sair */}
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

      {/* Conteúdo da home - Dashboard */}
      <div className="home-content-services">
        {/* Filtros e botão de atualização */}
        <div className="dashboard-filters">
          <div className="filter-tabs">
            <button className="filter-tab active">Services</button>
            <button className="filter-tab">Integrations</button>
          </div>
          <div className="filter-selects">
            <div className="filter-select">
              <label>Queue</label>
              <select defaultValue="All">
                <option value="All">All</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="filter-select">
              <label>Period</label>
              <select defaultValue="Today">
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="This month">This month</option>
              </select>
            </div>
          </div>
          <button className="update-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
            Update
          </button>
        </div>

        {/* Métricas principais */}
        <div className="metrics-container">
          <div className="metric-card">
            <div className="metric-title">Services</div>
            <div className="metric-value">65</div>
            <div className="metric-change positive">0%</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Unique clients</div>
            <div className="metric-value">65</div>
            <div className="metric-change positive">0%</div>
            <div className="metric-progress">
              <div className="progress-circle">
                <svg viewBox="0 0 36 36">
                  <path
                    className="progress-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="progress-fill"
                    strokeDasharray="100, 100"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="progress-text">
                    100%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Messages sent</div>
            <div className="metric-value">62</div>
            <div className="metric-change positive">0%</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Messages received</div>
            <div className="metric-value">13</div>
            <div className="metric-change positive">0%</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Avg. services / agent</div>
            <div className="metric-value">32.5</div>
            <div className="metric-change positive">0%</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">AHT</div>
            <div className="metric-value">00:03:01</div>
          </div>
        </div>

        {/* Gráficos e tabelas */}
        <div className="charts-container">
          <div className="chart-row">
            <div className="chart-card contacts-chart">
              <div className="chart-tabs">
                <button className="chart-tab active">Contacts per hour</button>
                <button className="chart-tab">Contacts per day of the month</button>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color chats"></span>
                  <span>Chats</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color calls"></span>
                  <span>Calls</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color abandoned"></span>
                  <span>Abandoned</span>
                </div>
              </div>
              <div className="bar-chart">
                {/* Aqui seria renderizado o gráfico de barras */}
                <div className="chart-placeholder">
                  <div className="y-axis">
                    <div>60</div>
                    <div>40</div>
                    <div>20</div>
                    <div>0</div>
                  </div>
                  <div className="bars-container">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="bar-group">
                        <div
                          className="bar"
                          style={{
                            height: i === 9 ? "45%" : i === 8 || i === 10 ? "15%" : "0%",
                          }}
                        ></div>
                        <div className="x-label">{`${i}h`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-card services-chart">
              <div className="chart-tabs">
                <button className="chart-tab active">Services by queue</button>
                <button className="chart-tab">Services by channel</button>
              </div>
              <div className="pie-chart">
                {/* Aqui seria renderizado o gráfico de pizza */}
                <div className="pie-placeholder">
                  <div className="pie"></div>
                  <div className="pie-legend">
                    <div className="legend-item">
                      <span className="legend-color iapc"></span>
                      <span>IAPC - (51) 980809191</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color financeiro"></span>
                      <span>IAPC - FINANCEIRO</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color rh"></span>
                      <span>RH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-card agents-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Services</th>
                    <th>D...</th>
                    <th>Average Services / ...</th>
                    <th>Msg. Sent</th>
                    <th>Msg. Received</th>
                    <th>AHT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>57</td>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>00:00:00</td>
                  </tr>
                  <tr>
                    <td>Angelo M.</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1.0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>00:07:30</td>
                  </tr>
                  <tr>
                    <td>Rafaela A.</td>
                    <td>7</td>
                    <td>1</td>
                    <td>7.0</td>
                    <td>26</td>
                    <td>2</td>
                    <td>00:26:54</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="chart-card services-chart">
              <div className="chart-tabs">
                <button className="chart-tab active">Services by IVR filter</button>
                <button className="chart-tab">Services by closure</button>
              </div>
              <div className="pie-chart">

                <div className="pie-placeholder">
                  <div className="pie blue-pie"></div>
                  <div className="pie-legend">
                    <div className="legend-item">
                      <span className="legend-color sem-filtro"></span>
                      <span>Sem filtro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettingsPopout && (
        <div ref={settingsRef} className="settings-popout">
          <button className="settings-option" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
export default HomePage