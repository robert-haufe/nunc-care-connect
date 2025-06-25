
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ticket {
  id: string;
  customerName: string;
  deviceType: "machine" | "grinder";
  issueCategory: string;
  description: string;
  urgency: "low" | "medium" | "high";
  status: "new" | "assigned" | "in-progress" | "resolved";
  assignedExpert?: string;
  suggestedSolution?: string;
  createdAt: string;
  estimatedType: "hardware" | "software" | "user-error" | "maintenance";
}

interface TicketsContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

// Mock initial tickets
const mockTickets: Ticket[] = [
  {
    id: "T-001",
    customerName: "Sarah Chen",
    deviceType: "machine",
    issueCategory: "leaking",
    description: "Coffee machine is leaking water from the bottom. Started yesterday morning. Water pools under the machine after each brew cycle.",
    urgency: "high",
    status: "new",
    suggestedSolution: "Exchange of one unit (espresso) suggested: Leaking Brewhead, the unit will be returned and exchange delivery will be send out to customer",
    createdAt: "2024-01-15T09:30:00Z",
    estimatedType: "hardware",
    assignedExpert: "Mischa (Technical Support)"
  },
  {
    id: "T-002", 
    customerName: "Michael Weber",
    deviceType: "grinder",
    issueCategory: "grinding",
    description: "Grinder makes loud grinding noise and coffee comes out very inconsistent. Some beans seem to get stuck.",
    urgency: "medium",
    status: "assigned",
    assignedExpert: "Emma (Hardware)",
    createdAt: "2024-01-14T14:20:00Z",
    estimatedType: "hardware"
  },
  {
    id: "T-003",
    customerName: "Lisa Park",
    deviceType: "machine", 
    issueCategory: "brewing",
    description: "Coffee tastes very weak even on strongest setting. Used to work fine but gradually getting weaker over past week.",
    urgency: "medium",
    status: "in-progress",
    assignedExpert: "David (Software)",
    createdAt: "2024-01-13T11:15:00Z",
    estimatedType: "maintenance"
  }
];

export const TicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'status'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: "new",
      // Simple AI analysis simulation
      estimatedType: ticketData.issueCategory.includes('leaking') || ticketData.issueCategory.includes('grinding') ? "hardware" : 
                    ticketData.issueCategory.includes('brewing') || ticketData.issueCategory.includes('milk') ? "maintenance" : "user-error",
      suggestedSolution: generateSuggestedSolution(ticketData),
      assignedExpert: assignExpert(ticketData)
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ));
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};

// Helper functions for AI analysis simulation
const generateSuggestedSolution = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>): string => {
  if (ticket.issueCategory.includes('leaking')) {
    return "Exchange of one unit (espresso) suggested: Leaking Brewhead, the unit will be returned and exchange delivery will be send out to customer";
  }
  if (ticket.issueCategory.includes('grinding')) {
    return "Hardware issue detected: Grinder mechanism may need cleaning or replacement. Check for bean residue buildup.";
  }
  if (ticket.issueCategory.includes('brewing')) {
    return "Maintenance required: Likely needs descaling or cleaning cycle. Check water quality and filter status.";
  }
  if (ticket.issueCategory.includes('milk')) {
    return "Maintenance required: Steam wand cleaning needed. Check milk system for blockages.";
  }
  return "Analysis pending: Please review ticket details for proper categorization.";
};

const assignExpert = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>): string => {
  if (ticket.issueCategory.includes('leaking') && ticket.urgency === 'high') {
    return "Mischa (Technical Support)";
  }
  if (ticket.issueCategory.includes('grinding') || ticket.issueCategory.includes('jamming')) {
    return "Emma (Hardware)";
  }
  if (ticket.issueCategory.includes('brewing') || ticket.issueCategory.includes('milk')) {
    return "David (Software)";
  }
  return "Auto-assignment pending";
};
