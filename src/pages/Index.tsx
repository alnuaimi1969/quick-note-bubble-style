
import ChromeExtensionPopup from '../components/ChromeExtensionPopup';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Chrome Extension Note Popup</h1>
        <p className="text-gray-600 mb-8">A clean, modern popup interface for note-taking</p>
        <ChromeExtensionPopup />
      </div>
    </div>
  );
};

export default Index;
