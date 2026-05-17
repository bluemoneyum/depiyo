import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';
import { useProjectsContext } from '../context/ProjectsContext';

export default function Contact() {
  const { siteConfig, addMessage, isLoading } = useProjectsContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: '웹사이트 디자인',
    content: ''
  });

  if (isLoading) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const messageId = Date.now().toString();
      await addMessage({
        ...formData,
        id: messageId,
        createdAt: new Date().toISOString()
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        contact: '',
        type: '웹사이트 디자인',
        content: ''
      });
    } catch (err) {
      alert('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <header className="px-6 py-32 md:py-40 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 line-clamp-2">{siteConfig.contact.title}</h1>
        <p className="text-xl text-neutral-gray max-w-2xl leading-relaxed whitespace-pre-line">
          {siteConfig.contact.description}
        </p>
      </header>

      <section className="px-6 pb-40 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-neutral-soft rounded-full flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Email</h3>
              <p className="text-neutral-gray">depiyo302@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-neutral-soft rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Phone</h3>
              <p className="text-neutral-gray">010-2943-2232</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-neutral-soft rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Location</h3>
              <p className="text-neutral-gray">Gwangju, South Korea</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl border border-neutral-100 shadow-sm"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">문의가 정상적으로<br />접수되었습니다!</h3>
              <p className="text-neutral-gray">확인 후 빠르게 연락드리겠습니다.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 bg-black text-white rounded-full font-bold"
              >
                추가 문의하기
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">성함 / 업체명</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 px-4 bg-neutral-soft border-none rounded-xl focus:ring-2 focus:ring-black transition-all outline-none" 
                    placeholder="홍길동" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">연락처</label>
                  <input 
                    type="text" 
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full h-12 px-4 bg-neutral-soft border-none rounded-xl focus:ring-2 focus:ring-black transition-all outline-none" 
                    placeholder="010-2943-2232" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">문의 유형</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-12 px-4 bg-neutral-soft border-none rounded-xl focus:ring-2 focus:ring-black transition-all outline-none"
                >
                  <option>웹사이트 디자인</option>
                  <option>이벤트 / 프로모션</option>
                  <option>상세페이지 제작</option>
                  <option>인쇄물 디자인</option>
                  <option>기타 문의</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">문의 내용</label>
                <textarea 
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full h-40 p-4 bg-neutral-soft border-none rounded-xl focus:ring-2 focus:ring-black transition-all outline-none resize-none" 
                  placeholder="문의하실 내용을 자유롭게 입력해주세요."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 bg-black text-white font-bold rounded-xl transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'}`}
              >
                {isSubmitting ? '전송 중...' : '프로젝트 문의하기'}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
