import { Alert } from "@/components/ui";
import { useState } from "react";

export const AlertDemo = () => {
  const [showDismissable, setShowDismissable] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Alert Component</h2>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Variants</h3>
        
        <Alert variant="info" title="Information">
          This is an informational message to keep you updated.
        </Alert>

        <Alert variant="success" title="Success!">
          Your changes have been saved successfully.
        </Alert>

        <Alert variant="warning" title="Warning">
          Please review the following before proceeding.
        </Alert>

        <Alert variant="danger" title="Error">
          There was a problem processing your request.
        </Alert>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Without Title</h3>
        
        <Alert variant="info">
          Simple info message without a title.
        </Alert>

        <Alert variant="success">
          Operation completed successfully.
        </Alert>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Dismissable</h3>
        
        {showDismissable && (
          <Alert 
            variant="warning" 
            title="Dismissable Alert"
            onClose={() => setShowDismissable(false)}
          >
            You can close this alert by clicking the X button.
          </Alert>
        )}
        
        {!showDismissable && (
          <button 
            onClick={() => setShowDismissable(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show Dismissable Alert
          </button>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Long Content</h3>
        
        <Alert variant="info" title="Detailed Information">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Alert>
      </section>
    </div>
  );
};
