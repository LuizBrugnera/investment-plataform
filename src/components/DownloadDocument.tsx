const DownloadDocument = ({ url }: { url: string }) => {
  const handleDownload = async () => {
    const urlFormated = url.split("/uploads/")[1];
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/download-archive/${urlFormated}`
    );
    if (response.ok) {
      const blob = await response.blob();
      console.log(blob.toString());
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Abrir-com-Chrome-ou-FireFox-Comprovante.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } else {
      alert("Failed to download file.");
    }
  };
  return (
    <div
      onClick={handleDownload}
      style={{ cursor: "pointer", color: "#476de7" }}
    >
      Comprovante.pdf
    </div>
  );
};

export default DownloadDocument;
