import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther } from 'viem';
import {
  Wallet as WalletIcon,
  Copy,
  ExternalLink,
  Coins,
  TrendingUp,
  Eye,
  EyeOff,
  RefreshCw,
  Send,
  ArrowDownLeft
} from 'lucide-react';

const Wallet = () => {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  
  const [showBalance, setShowBalance] = useState(true);

  // Mock additional data that would come from blockchain
  const creditBalance = "15,420";

  const transactions = [
    { id: 1, type: 'received', amount: '+0.5 ETH', from: '0x123...abc', time: '2 hours ago', status: 'confirmed' },
    { id: 2, type: 'sent', amount: '-0.1 ETH', to: '0x456...def', time: '1 day ago', status: 'confirmed' },
    { id: 3, type: 'mint', amount: '-0.02 ETH', description: 'Dataset NFT Mint', time: '2 days ago', status: 'confirmed' },
    { id: 4, type: 'received', amount: '+1.2 ETH', from: '0x789...ghi', time: '3 days ago', status: 'confirmed' },
  ];

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

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing...",
      description: "Updating wallet balance and transactions",
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen p-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <WalletIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect your wallet to view your balance, manage your assets, and interact with the VeriField dApp.
            </p>
            <Button onClick={handleConnectWallet} size="lg" className="shadow-glow">
              <WalletIcon className="h-5 w-5 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const ethBalance = balance ? formatEther(balance.value) : '0';
  const usdBalance = balance ? (parseFloat(formatEther(balance.value)) * 2000).toFixed(2) : '0'; // Mock USD rate

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <WalletIcon className="h-8 w-8 text-primary" />
              Wallet
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your digital assets and transactions
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Wallet Overview */}
        <Card className="bg-gradient-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                Wallet Balance
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                      </code>
                      <Button variant="ghost" size="sm" onClick={copyAddress}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
              </div>

              {showBalance && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">ETH Balance</p>
                      <p className="text-2xl font-bold text-foreground">{parseFloat(ethBalance).toFixed(4)} ETH</p>
                      <p className="text-sm text-muted-foreground">${usdBalance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">VeriField Credits</p>
                      <p className="text-2xl font-bold text-primary">{creditBalance}</p>
                      <p className="text-sm text-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12.5% this week
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <ArrowDownLeft className="h-4 w-4 mr-2" />
                        Receive
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-surface border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'received' ? 'bg-success/20 text-success' :
                      tx.type === 'sent' ? 'bg-warning/20 text-warning' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {tx.type === 'received' ? <ArrowDownLeft className="h-4 w-4" /> :
                       tx.type === 'sent' ? <Send className="h-4 w-4" /> :
                       <Coins className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {tx.description || (tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`)}
                      </p>
                      <p className="text-sm text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      tx.type === 'received' ? 'text-success' :
                      tx.type === 'sent' || tx.type === 'mint' ? 'text-warning' :
                      'text-foreground'
                    }`}>
                      {tx.amount}
                    </p>
                    <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;