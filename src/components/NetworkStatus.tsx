import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

interface NetworkStatusProps {
  className?: string;
}

const NetworkStatus = ({ className }: NetworkStatusProps) => {
  const { toast } = useToast();
  const { address, isConnected: isWalletConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const targetChainId = hardhat.id; // Hardhat local network
  const targetChainName = 'Hardhat Local';

  const handleSwitchNetwork = async () => {
    try {
      switchChain({ chainId: targetChainId });
      toast({
        title: "Network Switched",
        description: `Successfully switched to ${targetChainName}`,
      });
    } catch (error) {
      toast({
        title: "Network Switch Failed",
        description: "Please switch network manually in your wallet",
        variant: "destructive"
      });
    }
  };

  const handleConnectWallet = async () => {
    try {
      connect({ connector: injected() });
      toast({
        title: "Connecting Wallet",
        description: "Please approve the connection in your wallet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please make sure MetaMask is installed",
        variant: "destructive"
      });
    }
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet';
      case 31337: return 'Hardhat Local';
      case 11155111: return 'Sepolia';
      default: return `Chain ${chainId}`;
    }
  };

  const isCorrectNetwork = chainId === targetChainId;

  if (!navigator.onLine) {
    return (
      <Card className={`bg-destructive/10 border-destructive/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-foreground">No Network Connection</p>
              <p className="text-sm text-muted-foreground">Unable to connect to blockchain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isWalletConnected) {
    return (
      <Card className={`bg-warning/10 border-warning/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-foreground">Wallet Not Connected</p>
                <p className="text-sm text-muted-foreground">Connect wallet to use dApp features</p>
              </div>
            </div>
            <Button onClick={handleConnectWallet} size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <Card className={`bg-warning/10 border-warning/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-foreground">Wrong Network</p>
                <p className="text-sm text-muted-foreground">
                  Connected to {getNetworkName(chainId)} • Switch to {targetChainName}
                </p>
              </div>
            </div>
            <Button onClick={handleSwitchNetwork} size="sm">
              Switch Network
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-success/10 border-success/20 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="font-medium text-foreground">Connected to {getNetworkName(chainId)}</p>
              <p className="text-sm text-muted-foreground">Ready for blockchain interactions</p>
            </div>
          </div>
          <Badge variant="default" className="gap-1">
            <Wifi className="h-3 w-3" />
            Chain {chainId}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;