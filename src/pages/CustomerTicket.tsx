
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Coffee, Settings, User, Upload, Camera, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTickets } from "@/contexts/TicketsContext";

const CustomerTicket = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addTicket } = useTickets();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "Robert", // Changed from Natalie to Robert
    deviceType: "" as "machine" | "grinder" | "",
    issueCategory: "",
    description: "",
    urgency: "medium" as "low" | "medium" | "high",
    issueDateTime: "",
    followUpAnswers: {
      leakageLocation: "",
      hasPicture: false,
      unusualSigns: "",
      whenHappened: "",
      screenDisplay: "",
      hasScreenPicture: false
    }
  });

  const handleAnalyzeDescription = async () => {
    if (!formData.description.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFollowUp(true);
    }, 3000);
  };

  const handleSubmit = () => {
    if (formData.deviceType && formData.issueCategory && formData.description.trim()) {
      addTicket({
        customerName: formData.customerName,
        deviceType: formData.deviceType,
        issueCategory: formData.issueCategory,
        description: formData.description,
        urgency: formData.urgency,
        estimatedType: "hardware" // This will be overridden by the context logic
      });

      toast({
        title: "Ticket submitted successfully",
        description: "Our support team will get back to you within 30 minutes.", // Changed from 24 hours
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-right">
          <h1 className="text-2xl font-light text-gray-800">nunc.</h1>
          <p className="text-sm text-gray-600">support</p>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= step ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
            <h2 className="text-xl font-medium mb-2">What can we help you with?</h2>
            <p className="text-gray-600 mb-6 text-sm">Let us know which device you're having trouble with.</p>
            
            <div className="space-y-3">
              <Button
                variant={formData.deviceType === "machine" ? "default" : "outline"}
                className={`w-full justify-start h-14 rounded-2xl text-left ${
                  formData.deviceType === "machine" 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setFormData({...formData, deviceType: "machine"})}
              >
                <Coffee className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">Coffee Machine</div>
                  <div className="text-xs opacity-75">Brewing, milk steaming, cleaning</div>
                </div>
              </Button>
              
              <Button
                variant={formData.deviceType === "grinder" ? "default" : "outline"}
                className={`w-full justify-start h-14 rounded-2xl text-left ${
                  formData.deviceType === "grinder" 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setFormData({...formData, deviceType: "grinder"})}
              >
                <Settings className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">Coffee Grinder</div>
                  <div className="text-xs opacity-75">Grinding, dosing, bean switching</div>
                </div>
              </Button>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.deviceType}
              className="w-full mt-8 h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white"
            >
              Continue
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
            <h2 className="text-xl font-medium mb-2">Tell us more</h2>
            <p className="text-gray-600 mb-6 text-sm">
              What specific issue are you experiencing with your {formData.deviceType}?
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue category
                </label>
                <Select onValueChange={(value) => setFormData({...formData, issueCategory: value})}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.deviceType === "machine" ? (
                      <>
                        <SelectItem value="brewing">Coffee brewing issues</SelectItem>
                        <SelectItem value="milk">Milk steaming problems</SelectItem>
                        <SelectItem value="cleaning">Cleaning cycle issues</SelectItem>
                        <SelectItem value="leaking">Water leaking</SelectItem>
                        <SelectItem value="power">Power/electrical issues</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="grinding">Grinding problems</SelectItem>
                        <SelectItem value="dosing">Dosing inconsistency</SelectItem>
                        <SelectItem value="bean-switching">Bean switching issues</SelectItem>
                        <SelectItem value="calibration">Calibration problems</SelectItem>
                        <SelectItem value="jamming">Grinder jamming</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency level
                </label>
                <Select onValueChange={(value) => setFormData({...formData, urgency: value as "low" | "medium" | "high"})} defaultValue="medium">
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait a few days</SelectItem>
                    <SelectItem value="medium">Medium - Would like help soon</SelectItem>
                    <SelectItem value="high">High - Urgent, device unusable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={!formData.issueCategory}
              className="w-full mt-8 h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white"
            >
              Continue
            </Button>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
            <h2 className="text-xl font-medium mb-2">Describe the problem</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Please provide as much detail as possible about what's happening.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and time of issue
                </label>
                <Input
                  type="datetime-local"
                  className="h-12 rounded-xl border-gray-200"
                  value={formData.issueDateTime}
                  onChange={(e) => setFormData({...formData, issueDateTime: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem description
                </label>
                <Textarea
                  placeholder="When did this start happening? What exactly goes wrong? Any error messages?"
                  className="min-h-32 rounded-xl border-gray-200 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Tip:</strong> Include details like:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• When the problem occurs</li>
                  <li>• Any sounds or error messages</li>
                  <li>• What you were trying to do</li>
                  <li>• How long you've had the device</li>
                </ul>
              </div>
            </div>

            {!isAnalyzing && !showFollowUp && (
              <Button
                onClick={handleAnalyzeDescription}
                disabled={!formData.description.trim()}
                className="w-full mt-8 h-12 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white"
              >
                Analyze issue
              </Button>
            )}

            {isAnalyzing && (
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <p className="text-blue-800 font-medium">AI is analyzing your issue...</p>
                </div>
                <p className="text-sm text-blue-600 text-center mt-2">This may take a few seconds</p>
              </div>
            )}

            {showFollowUp && (
              <Button
                onClick={() => setStep(4)}
                className="w-full mt-8 h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white"
              >
                Continue to additional questions
              </Button>
            )}
          </Card>
        )}

        {step === 4 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
            <h2 className="text-xl font-medium mb-2">Additional questions</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Help us understand the issue better with a few more details.
            </p>
            
            <div className="space-y-6">
              {formData.issueCategory === "leaking" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Where did you detect the leakage? Can you localize it?
                  </label>
                  <Textarea
                    placeholder="Describe the location of the leak (e.g., bottom of machine, water tank, drip tray...)"
                    className="min-h-20 rounded-xl border-gray-200 resize-none"
                    value={formData.followUpAnswers.leakageLocation}
                    onChange={(e) => setFormData({
                      ...formData, 
                      followUpAnswers: {
                        ...formData.followUpAnswers,
                        leakageLocation: e.target.value
                      }
                    })}
                  />
                  <Button variant="outline" className="mt-2 rounded-xl">
                    <Camera className="h-4 w-4 mr-2" />
                    Take a picture
                  </Button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Did you notice any unusual sounds, vibrations, or other signs?
                </label>
                <Textarea
                  placeholder="Describe any unusual sounds, vibrations, smells, or other signs you noticed"
                  className="min-h-20 rounded-xl border-gray-200 resize-none"
                  value={formData.followUpAnswers.unusualSigns}
                  onChange={(e) => setFormData({
                    ...formData, 
                    followUpAnswers: {
                      ...formData.followUpAnswers,
                      unusualSigns: e.target.value
                    }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When did it happen?
                </label>
                <Select onValueChange={(value) => setFormData({
                  ...formData, 
                  followUpAnswers: {
                    ...formData.followUpAnswers,
                    whenHappened: value
                  }
                })}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200">
                    <SelectValue placeholder="Select when the issue occurred" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="during-brewing">During brewing</SelectItem>
                    <SelectItem value="after-brewing">After brewing</SelectItem>
                    <SelectItem value="during-steaming">During milk steaming</SelectItem>
                    <SelectItem value="when-turning-on">When turning on</SelectItem>
                    <SelectItem value="when-turning-off">When turning off</SelectItem>
                    <SelectItem value="during-cleaning">During cleaning cycle</SelectItem>
                    <SelectItem value="standby">During standby</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What was displayed on the screen?
                </label>
                <Textarea
                  placeholder="Describe any error messages, codes, or unusual displays on the screen"
                  className="min-h-20 rounded-xl border-gray-200 resize-none"
                  value={formData.followUpAnswers.screenDisplay}
                  onChange={(e) => setFormData({
                    ...formData, 
                    followUpAnswers: {
                      ...formData.followUpAnswers,
                      screenDisplay: e.target.value
                    }
                  })}
                />
                <Button variant="outline" className="mt-2 rounded-xl">
                  <Camera className="h-4 w-4 mr-2" />
                  Take a picture of the screen
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full mt-8 h-12 rounded-2xl bg-green-500 hover:bg-green-600 text-white"
            >
              Submit ticket
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerTicket;
