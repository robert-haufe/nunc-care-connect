
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, Settings, LifeBuoy, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <Coffee className="h-4 w-4 text-amber-700" />
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-light text-gray-800">nunc.</h1>
          <p className="text-sm text-gray-600">coffee</p>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6">
        {/* Welcome Section */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            hello natalie
          </h2>
          <p className="text-gray-600 text-sm">
            Need help with your nunc. coffee experience?
          </p>
        </div>

        {/* Support Actions */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/customer-ticket")}
              className="w-full justify-between h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
            >
              <div className="flex items-center space-x-3">
                <LifeBuoy className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Get help & support</div>
                  <div className="text-xs opacity-90">Report an issue with your device</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => navigate("/support-dashboard")}
              variant="outline"
              className="w-full justify-between h-16 rounded-2xl border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Support dashboard</div>
                  <div className="text-xs text-gray-500">Internal support team access</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Device Status */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-6">
          <h3 className="font-medium mb-4">Your devices</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Coffee className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Coffee machine</p>
                  <p className="text-xs text-green-600">Connected & ready</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-sm">Coffee grinder</p>
                  <p className="text-xs text-orange-600">Connected & ready</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </Card>

        {/* Help Center Preview */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Help center</h3>
              <span className="text-xs text-gray-500">Quick access</span>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-100 rounded-xl p-3 text-center">
                <div className="text-xs font-medium text-blue-800 mb-1">Cleaning</div>
                <div className="text-xs text-blue-600">Guides</div>
              </div>
              <div className="bg-purple-100 rounded-xl p-3 text-center">
                <div className="text-xs font-medium text-purple-800 mb-1">Brewing</div>
                <div className="text-xs text-purple-600">Tips</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <Coffee className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-900">Home</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Settings className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <LifeBuoy className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
