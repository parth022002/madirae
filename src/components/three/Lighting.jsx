export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight position={[3, 5, 4]} angle={0.32} penumbra={0.8} intensity={4.5} color="#f6dfaa" />
      <pointLight position={[-3, -1, -2]} intensity={1.6} color="#b96f3d" />
    </>
  );
}
