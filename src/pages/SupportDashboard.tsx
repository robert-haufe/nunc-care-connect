import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Settings, Search, Filter, Clock, AlertCircle, CheckCircle, User, ArrowRight } from "lucide-react";
import { useTickets, Ticket } from "@/contexts/TicketsContext";

const SupportDashboard = () => {
  const { tickets } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState("all");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-purple-100 text-purple-800 border-purple-200";
      case "assigned": return "bg-blue-100 text-blue-800 border-blue-200"; 
      case "in-progress": return "bg-orange-100 text-orange-800 border-orange-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (deviceType: string) => {
    return deviceType === "machine" ? <Coffee className="h-4 w-4" /> : <Settings className="h-4 w-4" />;
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  // Calculate stats from real ticket data
  const newTicketsCount = tickets.filter(t => t.status === "new").length;
  const inProgressCount = tickets.filter(t => t.status === "in-progress" || t.status === "assigned").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-light text-gray-900">nunc. support</h1>
              <p className="text-gray-600">Customer support dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                <Search className="h-4 w-4 text-gray-400" />
                <Input placeholder="Search tickets..." className="border-0 shadow-none focus-visible:ring-0" />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tickets</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New tickets</p>
                  <p className="text-2xl font-semibold">{newTicketsCount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">In progress</p>
                  <p className="text-2xl font-semibold">{inProgressCount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Resolved today</p>
                  <p className="text-2xl font-semibold">5</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg response</p>
                  <p className="text-2xl font-semibold">2.3h</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Tickets List */}
          <div className="col-span-8">
            <Card className="bg-white">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Support tickets ({filteredTickets.length})</h2>
              </div>
              <div className="divide-y">
                {filteredTickets.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p>No tickets found matching your filter criteria.</p>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedTicket?.id === ticket.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm text-gray-600">{ticket.id}</span>
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(ticket.deviceType)}
                              <span className="text-sm capitalize">{ticket.deviceType}</span>
                            </div>
                            <Badge className={getUrgencyColor(ticket.urgency)}>
                              {ticket.urgency}
                            </Badge>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status.replace('-', ' ')}
                            </Badge>
                            {ticket.status === "new" && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                New
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{ticket.customerName}</h3>
                          <p className="text-sm text-gray-600 mb-2 capitalize">{ticket.issueCategory.replace('-', ' ')}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{ticket.description}</p>
                          {ticket.assignedExpert && (
                            <p className="text-xs text-blue-600 mt-2">Assigned to: {ticket.assignedExpert}</p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Ticket Details */}
          <div className="col-span-4">
            {selectedTicket ? (
              <Card className="bg-white">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Ticket details</h2>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Ticket ID</p>
                      <p className="font-mono">{selectedTicket.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium">{selectedTicket.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Device & Category</p>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(selectedTicket.deviceType)}
                        <span className="capitalize">{selectedTicket.deviceType} - {selectedTicket.issueCategory.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Urgency</p>
                      <Badge className={getUrgencyColor(selectedTicket.urgency)}>
                        {selectedTicket.urgency}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Problem description</p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                      {selectedTicket.description}
                    </p>
                  </div>

                  {selectedTicket.suggestedSolution && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">AI Analysis & Suggestion</p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                            {selectedTicket.estimatedType}
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-900">{selectedTicket.suggestedSolution}</p>
                      </div>
                    </div>
                  )}

                  {selectedTicket.assignedExpert && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Assigned expert</p>
                      <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-900">{selectedTicket.assignedExpert}</p>
                          <p className="text-xs text-green-700">Available for consultation</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Start resolution process
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact customer
                    </Button>
                    <Button variant="outline" className="w-full">
                      Escalate to expert
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white p-6">
                <div className="text-center text-gray-500">
                  <p>Select a ticket to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
