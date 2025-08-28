import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Zap,
  Upload as UploadIcon,
  FileText,
  Hash,
  Link as LinkIcon,
  Tag,
  Coins,
  Clock,
  ArrowRight
} from 'lucide-react';

const Mint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ipfsCid: '',
    sha256: '',
    licenseUrl: '',
    tags: '',
    price: '0'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return false;
    if (!formData.description.trim()) return false;
    if (!formData.ipfsCid.trim()) return false;
    if (!formData.sha256.trim() || formData.sha256.length !== 64) return false;
    return true;
  };

  const handleQuickMint = async () => {
    if (!validateForm()) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields correctly",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock minting process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const tokenId = Math.floor(Math.random() * 10000);
      
      toast({
        title: "NFT Minted Successfully!",
        description: `Your dataset "${formData.title}" has been minted as NFT #${tokenId}`,
      });
      
      // Navigate to the dataset detail page
      setTimeout(() => {
        navigate(`/dataset/${tokenId}`);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedUpload = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3 mb-2">
            <Zap className="h-10 w-10 text-primary" />
            Quick Mint
          </h1>
          <p className="text-muted-foreground text-lg">
            Fast-track your dataset to NFT in minutes
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">2-3 Minutes</p>
              <p className="text-sm text-muted-foreground">Average mint time</p>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-semibold text-foreground">0.02 ETH</p>
              <p className="text-sm text-muted-foreground">Estimated gas fee</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="p-4 text-center">
              <Hash className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="font-semibold text-foreground">Permanent</p>
              <p className="text-sm text-muted-foreground">Immutable on-chain</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Mint Form */}
        <Card className="bg-surface border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Dataset Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Dataset Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Climate Data 2024"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your dataset..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="ipfsCid">IPFS CID *</Label>
              <Input
                id="ipfsCid"
                placeholder="bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
                value={formData.ipfsCid}
                onChange={(e) => handleInputChange('ipfsCid', e.target.value)}
                className="mt-1 font-mono"
              />
            </div>

            <div>
              <Label htmlFor="sha256">SHA-256 Hash *</Label>
              <Input
                id="sha256"
                placeholder="64-character SHA-256 hash"
                value={formData.sha256}
                onChange={(e) => handleInputChange('sha256', e.target.value)}
                className="mt-1 font-mono"
                maxLength={64}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.sha256.length}/64 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="climate, data, research"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (ETH)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0.0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {formData.licenseUrl && (
              <div>
                <Label htmlFor="licenseUrl">License URL</Label>
                <Input
                  id="licenseUrl"
                  placeholder="https://creativecommons.org/licenses/by/4.0/"
                  value={formData.licenseUrl}
                  onChange={(e) => handleInputChange('licenseUrl', e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            {/* Tags Preview */}
            {formData.tags && (
              <div>
                <Label>Tags Preview</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={handleAdvancedUpload}
            className="flex-1"
          >
            <UploadIcon className="h-4 w-4 mr-2" />
            Advanced Upload
          </Button>
          <Button
            onClick={handleQuickMint}
            disabled={isLoading || !validateForm()}
            className="flex-1 shadow-glow hover:shadow-elevated transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Mint NFT Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-muted/30 border-border/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <LinkIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Need more options?</p>
                <p className="text-sm text-muted-foreground">
                  Use our advanced upload page for additional features like verification requests, 
                  custom metadata, and batch uploads.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mint;